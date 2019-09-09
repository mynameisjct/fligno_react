import React, {PureComponent, Component} from 'react';
import ReactCrop from 'react-image-crop';
import {Input, FormText, Button, ButtonGroup} from 'reactstrap';
import "react-image-crop/dist/ReactCrop";
import Dropzone from 'react-dropzone';

//import third-party functions
import {convertFileToBase64,extractImageFileExtensionFromBase64,downloadBase64File,uploadBase64File} from '../Forms/Utils';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {savePicture} from '../../../Action/RegisterActions';
import {retrieve_PP,retrieve_CP,tempCoverPhoto,tempProfilePicture} from '../../../Action/PictureActions';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png,image/png,image/jpeg,image/jpg';

class ImageForm extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            crop: {
                unit: "%",
                width: 30,
                aspect: 1 / 1
            },
            src: null,
            ext: null,
            base64Img: null,
            headerMessage: '',
            type: this.props.type === 'profile' ? 'pp' : 'cp', // prop type is rather profile or cover
        }
      this.onUpload.bind(this)
    }

    onUpload = async(param) => {
      await this.setState({headerMessage: 'Photo Uploaded!'}, this.handleSelectedCropped())
      await this.props.message(this.state.headerMessage)

      // get path
      const {type} = this.state
      const {userid} = this.props

      if(type === 'pp'){
        this.props.retrieve_PP({},userid)
      }else{
        this.props.retrieve_CP({},userid)
      }
    }

    verifyFile = file => {
      if(file && file.length > 0){
          const currentFile = file[0];
          const currentFileType = currentFile.type;
          const currentFileSize = currentFile.size;

          if(currentFileSize > imageMaxSize){
              alert('Max image size not allowed')
              return false
          }

          if(!acceptedFileTypes.includes(currentFileType)){
              alert('file is not allowed')
              return false
          }
          return true
      }
  }

  // ON SELECTING CROPPED IMAGE FOR UPLOAD
      handleSelectedCropped =  (e) => {
        // e.preventDefault();
        const {src, ext, croppedImageUrl, type} = this.state

        if((croppedImageUrl !== undefined && croppedImageUrl !== null) || ext !== null){ 
          // save to database
            // this.props.savePicture({email: this.props.user, file_extension: ext, uploaded_file: croppedImageUrl, type: type})

          // save to props
          if(type === 'pp'){
            this.props.tempProfilePicture({
              source: croppedImageUrl,
              file_extension: ext
            })
          }else{
            this.props.tempCoverPhoto({
              source: croppedImageUrl,
              file_extension: ext
            })
          }
          
        }
    }

    onSelectFile = f => {
      const files = f.target.files
        if(files && files.length > 0){
            const isVerified = this.verifyFile(files)

            if(isVerified){
              const reader = new FileReader();
              reader.addEventListener("load", () => this.setState({src: reader.result, ext: extractImageFileExtensionFromBase64( reader.result)}));
              reader.readAsDataURL(files[0]);
            }
        }
    }

    onHandleDrop = (files, rejectedFiles) => {
      if(rejectedFiles && rejectedFiles.length > 0){
          this.verifyFile(rejectedFiles)
      }

      if(files && files.length > 0){
          const isVerified = this.verifyFile(files)

          if(isVerified){
              // image base64 data
              const currentFile = files[0];
              const myFileItemReader = new FileReader();

              myFileItemReader.addEventListener("load", () => {
                  // console.log(myFileItemReader.result)

                  const itemResult = myFileItemReader.result;
                  this.setState({
                    src: itemResult,
                    ext: extractImageFileExtensionFromBase64(itemResult)
                  })
              }, false)

              myFileItemReader.readAsDataURL(currentFile)
          }
      }
  }


    onImageLoaded = image => {
        this.imageRef = image
    }

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    }

    onCropChange = (crop, percentCrop) => {
        this.setState({crop})
    }

    //blob
    async makeClientCrop(crop) {
        if(this.imageRef && crop.width && crop.height){
            const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, "file.jpeg");
            this.setState({croppedImageUrl})
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
          
        // TO BASE64
         return canvas.toDataURL('image/jpeg');

        // TO BLOB
        // return new Promise((resolve, reject) => {
        //   canvas.toBlob(blob => {
        //     if (!blob) {
        //       //reject(new Error('Canvas is empty'));
        //       console.error("Canvas is empty");
        //       return;
        //     }
        //     blob.name = fileName;
        //     window.URL.revokeObjectURL(this.fileUrl);
        //     this.fileUrl = window.URL.createObjectURL(blob);
        //     resolve(this.fileUrl);
        //   }, "image/jpeg");
        // });
      }

    // clear things after successful / reset to default
    handleReset = async() => {

      await this.setState({
          src: null,
          ext: null,
          crop: {
              aspect: 1/1
          },
          croppedImageUrl: undefined,
          headerMessage: ''
      })

      this.props.message(this.state.headerMessage)
    }

    onDownload = () => {
      const {croppedImageUrl, ext} = this.state
      if((croppedImageUrl !== undefined && croppedImageUrl !== null) || ext !== null){
        downloadBase64File(croppedImageUrl,'Profile Picture.' + ext)
      }
    }

    render(){
        const { crop, croppedImageUrl, src, headerMessage } = this.state;
        return (
          <div style={styles.render}>
            <div>
              <Input type="file" onChange={this.onSelectFile} accept={acceptedFileTypes} multiple={false}/>
                    <Dropzone accept={acceptedFileTypes} onDrop={this.onHandleDrop} maxSize={imageMaxSize} multiple={false}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <p>Or drag and drop the file here...</p>
                            </div>
                        )}
                    </Dropzone>
            </div>
            {src && (
              <div>
                <ReactCrop
                  src={src}
                  crop={crop}
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              </div>
            )}
            {croppedImageUrl && (
              <div>
                <FormText>Crop Preview</FormText>
                <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                <br/><br/>
                <ButtonGroup>
                <Button color="primary" onClick={this.onDownload}>Download</Button>
                  <Button color="warning" onClick={this.onUpload}>Upload</Button>
                  <Button color="danger" onClick={this.handleReset}>Reset</Button>
                </ButtonGroup>
              </div>
            )}
          </div>
        );
    }
}

const styles = {
  render: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({savePicture,retrieve_PP,retrieve_CP,tempCoverPhoto,tempProfilePicture}, dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(ImageForm);