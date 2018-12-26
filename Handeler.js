
const Jimp =require('jimp');
const Fakerator = require("fakerator");
const fs = require('fs');
const settings =require("./settings.json")
const isImage = require('is-image');
const imageType = require('image-type');
const filepath = require('filepath');
const ifIsImage = require('if-is-image');
const path = require('path');
const readChunk = require('read-chunk');
var fakerator =Fakerator();
var ff = require('node-find-folder');

console.log(settings.result_folder);


function HandleArguments(arguments){

    for(var i in arguments) {
 
     try{
         //check if is the folder name
         if(arguments.folder===("orgin")){
             //check if the string entred is a folder
            
         //call a function that resize the pictures
         CallreSize("./"+arguments.folder,arguments)
         }
    }catch(e){
       // Handle error
       if(e.code == 'ENOENT'){
          console.log("no such thing")
       }else {
         console.error("recieved error while handling arguments: ",e);
         
       }
    }
 }
 }
//function that handek one file 
function HandleFile(arguments){
        
    for(var i in arguments) {

    try{
            console.log("this",arguments[i].toString())
              console.log("comparison:::::",  arguments[i]===arguments[i].toString())
            const isIm= ifIsImage(arguments[i].toString());  
            if((isIm)){
                FileResize(arguments[i].toString(),arguments)
            }
       }catch(e){
          // Handle error
            console.error("recieved error while handling file: ",e);
       }
           
    }
}

 function CallreSize(path,enteredArgs){



    fs.readdir(path, function(err, items) {
        //  console.log(path);

        for (var i=0; i<items.length; i++) {

            //check if evrey file is an image
            if( isImage(path.toString()+"/"+items[i].toString())){
                // var name=fakerator.names.name();
                // const buffer = readChunk.sync(path+"/"+items[i] , 0, 12);
                // console.log("a deo",items[i])
                // console.log("destination argv ",enteredArgs.destinionFolder, 'all argvs',enteredArgs.relevantArgvs)
                // console.log("this is my type",typeof enteredArgs.Wd )
                // console.log("this a demo",name.toString()+"."+imageType(buffer).ext)

                resize(path+"/"+items[i]  ,parseInt(enteredArgs.Wd),parseInt(enteredArgs.Hi),100,"./"+enteredArgs.destinionFolder+"/"+items[i]);
        
              }
    
              
            
            
        }
    
    })
 }
// recive  the width and hight for resize a image  
// also the quality and the diraction path with the full name of the resize image
function resize (from,wd,hi,qua,fileNameWithPath){
Jimp.read(from,(err,to)=>{
    if(err) throw err;
    to.resize(wd,hi).quality(qua).write(fileNameWithPath);
});
}

//function that resize one image at a time
function FileResize(img,enteredArgs){
    
    var p1 = filepath.create(img);
    console.log("got image",p1);
    var p= path.parse(img);
            
    console.log("got image",p);
    var name=fakerator.names.name();

 


    resize(enteredArgs.folder+"/"+p.base ,parseInt(enteredArgs.Wd),parseInt(enteredArgs.Hi),50,"./"+enteredArgs.destinionFolder+"/"+name.toString()+"."+p.ext);

}
module.exports ={
    HandleArguments:HandleArguments,
    HandleFile: HandleFile,
    CallreSize: CallreSize,
    FileResize: FileResize,
    resize:resize
};
