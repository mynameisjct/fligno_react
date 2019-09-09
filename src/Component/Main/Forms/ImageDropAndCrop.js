import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import './custom-image-crop.css';
import {Button,ButtonGroup, FormText} from 'reactstrap';

//import third-party functions
import {image64toCanvasRef,extractImageFileExtensionFromBase64,base64StringtoFile,downloadBase64File} from '../Forms/Utils';

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {savePicture} from '../../../Action/RegisterActions';

const imageMaxSize = 1000000000;
const acceptedFileTypes = 'image/x-png,image/png,image/jpeg,image/jpg';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

class ImageDropAndCrop extends Component {
    constructor(props){
        super(props);
        this.fileInputRef = React.createRef()
        this.imagePreviewCanvasRef = React.createRef()
        this.state = {
            imgSrc: null,
            imgExt: null,
            crop: {
                aspect: 3/2
            },
        }

        this.onHandleDrop.bind(this);
        this.handleOnCropChange.bind(this);
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
                    console.log(myFileItemReader.result)

                    const itemResult = myFileItemReader.result;
                    this.setState({
                        imgSrc: itemResult,
                        imgExt: extractImageFileExtensionFromBase64(itemResult)
                    })
                }, false)

                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    handleImageLoaded = (image) => {
        // return false on setstate callback here if invoked
        // console.log(image);
    }

    handleOnCropChange = (crop, percentCrop) => {
        this.setState({crop: crop})
    }

    handleOnCropComplete = (crop,pixelCrop) => {
        console.log('Cropped Dimensions: ', crop,pixelCrop);
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc} = this.state

        
        image64toCanvasRef(canvasRef,imgSrc,crop);
    }

    // processing cropped image
    handleSelectedCropped =  (e) => {
        e.preventDefault();
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc, imgExt} = this.state

        if(imgSrc){ // download when has imgSrc

            // check canvas dimension
            if(canvasRef.width <= 0 && canvasRef.height <= 0){
                alert('Please crop the image')
                return false
            }
            // const fileExtension = extractImageFileExtensionFromBase64(imgSrc) // extract file extension from base64 image
            const image64 = canvasRef.toDataURL('image/' + imgExt)

            // change this filename to user or append
            const fileName = "PreviewFile64." + imgExt 

            //upload the processed file
            const croppedFile = base64StringtoFile(image64, fileName) // replace imgSrc to base64 
            

            this.props.savePicture({email: this.props.user, uploaded_file: croppedFile});

            //download the processed file
            // downloadBase64File(image64,fileName) // replace imgSrc to base64 image
            this.handleReset()   //clear after downloading


        }

    }

    //handle selected crop and display as selected file
    handleSelectedCroppedFile = e => {
        const files = e.target.files
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
                        imgSrc: itemResult,
                        imgExt: extractImageFileExtensionFromBase64(itemResult)
                    })
                }, false)

                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    // clear things after successful / reset to default
    handleReset = e => {
        const canvasRef = this.imagePreviewCanvasRef.current
        const ctx = canvasRef.getContext('2d')
        ctx.clearRect(0,0, canvasRef.width,canvasRef.height)

        this.setState({
            imgSrc: null,
            imgExt: null,
            crop: {
                aspect: 2/2
            }
        })

        this.fileInputRef.current.value = null
    }

    // handlePartialReset = e => {
    //     const canvasRef = this.imagePreviewCanvasRef.current
    //     const ctx = canvasRef.getContext('2d')
    //     ctx.clearRect(0,0, canvasRef.width,canvasRef.height)

    //     this.setState({
    //         imgSrc: null,
    //         imgExt: null,
    //         crop: {
    //             aspect: 2/2
    //         }
    //     })

    // }


    render(){
        const {imgSrc} = this.state;
        // console.log(imgSrc)
        return(
            <div > 
                <input ref={this.fileInputRef} type="file" onChange={this.handleSelectedCroppedFile} multiple={false} accept={acceptedFileTypes} />
                {imgSrc !== null ?
                    <div>
                       
                        <ReactCrop 
                            src={imgSrc} 
                            crop={this.state.crop}                             
                            onImageLoaded={this.handleImageLoaded}
                            onComplete={this.handleOnCropComplete}                            
                            onChange={this.handleOnCropChange} 
                        />
                        <br/>
                        <FormText>Preview Cropped Image</FormText>
                        <canvas ref={this.imagePreviewCanvasRef} />
                        <br/><br/>
                        <ButtonGroup>
                            <Button color="primary" onClick={this.handleSelectedCropped}>Select</Button>
                            <Button color="danger" onClick={this.handleReset}>Reset</Button>
                        </ButtonGroup>
                        
                    </div>
                    :
                    <Dropzone accept={acceptedFileTypes} onDrop={this.onHandleDrop} maxSize={imageMaxSize} multiple={false}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <p>Or drag and drop the file here...</p>
                            </div>
                        )}
                    </Dropzone>
                }   
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

const MapDispatchToProps = dispatch =>
    bindActionCreators({savePicture}, dispatch);

export default connect(mapStateToProps,MapDispatchToProps)(ImageDropAndCrop);

// export default ImageDropAndCrop;