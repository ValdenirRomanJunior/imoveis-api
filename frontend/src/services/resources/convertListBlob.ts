export function convertToBlobList (image:string[]){
    
    let array: Blob[]=[];
    for(var j=0; j< image.length; j++){

    var byteString= atob(image[j].split(',')[1]);
    var mimeString= image[j].split(',')[0].split(':')[1].split(';')[0];
    var ab= new ArrayBuffer(byteString.length);
    var ia= new Uint8Array(ab)
    for(var i=0; i< byteString.length; i++){
        ia[i]=byteString.charCodeAt(i);
     
    } 
    array.push(new Blob([ab], {type: mimeString}))
   // return new Blob([ab], {type: mimeString});
  
 
    }
    return array;
}