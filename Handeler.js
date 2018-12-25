
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
         if(arguments[i]===("orgin")){
             //check if the string entred is a folder
     

         //call a function that resize the pictures
         CallreSize("./"+arguments[i].toString())
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
            console.log(arguments[i].toString())
            console.log("comparison:::::",  arguments[i]==="file.jpg")
            const isIm= ifIsImage(arguments[i].toString());  
            if((isIm)){
                FileResize(arguments[i].toString())
            }
       }catch(e){
          // Handle error
            console.error("recieved error while handling file: ",e);
       }
           
    }
}

 function CallreSize(path){

    fs.readdir(path, function(err, from) {


    fs.readdir(path, function(err, items) {
        console.log(path);
    
        for (var i; i<items.lengh; i++) {
            //check if evrey file is a image
            if( isImage(path.toString()+"/"+from[i].toString())){
                var name=fakerator.names.name();
                const buffer = readChunk.sync(path+"/"+from[i] , 0, 12);
                console.log("a deo",from[i])
                console.log("destination argv ",index.relevantArgvs.destinionFolder, 'all argvs',index.relevantArgvs)
                console.log("this is my type",typeof index.relevantArgvs.Wd )
                console.log("this a demo",name.toString()+"."+imageType(buffer).ext)
                // resize(path+"/"+from[i]  ,parseInt(index.relevantArgvs.Wd),parseInt(index.relevantArgvs.Hi),50,"./"+index.relevantArgvs.destinionFolder+"/"+name.toString()+"."+imageType(buffer).ext);

                resize(path+"/"+from[i]  ,parseInt(index.relevantArgvs.Wd),parseInt(index.relevantArgvs.Hi),100,"./"+index.relevantArgvs.destinionFolder+"/"+from[i]);
        
              }
    
            }

    })
    
})};

// recive  the width and hight for resize a image  
// also the quality and the diraction path with the full name of the resize image
function resize (from,wd,hi,qua,fileNameWithPath){
Jimp.read(from,(err,to)=>{
    if(err) throw err;
    to.resize(wd,hi).quality(qua).write(fileNameWithPath);
});
}

//function that resize one image at a time
function FileResize(img){
    
    var p1 = filepath.create(img);
    console.log("got image",p1);
    var p= path.parse(img);
            
    console.log("got image",p);
    var name=fakerator.names.name();
  console.log("destination argv ",index.relevantArgvs.destinionFolder, 'all argvs',index.relevantArgvs)

 


    resize(index.relevantArgvs.folder+"/"+p.base ,parseInt(index.relevantArgvs.Wd),parseInt(index.relevantArgvs.Hi),50,"./"+index.relevantArgvs.destinionFolder+"/"+name.toString()+"."+p.ext);

}
module.exports ={
    HandleArguments:HandleArguments,
    HandleFile: HandleFile,
    CallreSize: CallreSize,
    FileResize: FileResize,
    resize:resize
};
