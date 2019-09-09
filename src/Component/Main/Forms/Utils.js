// CONVERT BASE64 ENCODED IMAGE TO FILE OBJECT
export function base64StringtoFile(base64String, filename) {
  console.log('rrrr: ', base64String)
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

//DOWNLOAD A BASE64 ENCODED FILE
export function downloadBase64File(base64Data, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', base64Data);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

//EXTRACT BASE64 IMAGE EXTENSION
export function extractImageFileExtensionFromBase64(base64Data){
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
}

//IMAGE CANVASS WITH A CROP
export function image64toCanvasRef(canvasRef, image64, pixelCrop){
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image()
    image.src = image64
    image.onload = function() {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        )
      }
  }


export function getCroppedImg(image, pixelCrop, fileName) {

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');
  
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  //CONVERT BLOB FILE TO base64
  export const convertFileToBase64 = file => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve({
        fileName: file.title,
        base64: reader.result
    });
    reader.onerror = reject;
});

//DOWNLOAD A BASE64 ENCODED FILE
export function uploadBase64File(base64Data, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', base64Data);
  element.setAttribute('upload', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

