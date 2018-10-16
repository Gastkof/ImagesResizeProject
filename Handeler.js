
const Jimp =require('jimp');
const Fakerator = require("fakerator");
const fs = require('fs');
const settings =require("./settings.json")
//const findUp = require('find-up');
const isImage = require('is-image');
const imageType = require('image-type');
const filepath = require('filepath');
const ifIsImage = require('if-is-image');
const path = require('path');
const readChunk = require('read-chunk');
// const locatePath = require('locate-path');
var fakerator =Fakerator();
// const makeDir = require('make-dir');
// const prompt = require('prompt-sync')();
console.log(settings.result_folder);

const index = require('./index')
const validate = require('./Validate')

var args=index.recievedArguments
function HandleArguments(arguments){

    for(var i in arguments) {
 
     try{
         //check if is the folder name
         if(arguments[i]===("demoFolder")){
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
        console.log(items);
    
        for (var i=0; i<items.length; i++) {
            //check if evrey file is a image
            if( isImage(path.toString()+"/"+from[i].toString())){
                var name=fakerator.names.name();
                const buffer = readChunk.sync(path+"/"+from[i] , 0, 12);
                console.log("destination argv ",index.relevantArgvs.destinionFolder, 'all argvs',index.relevantArgvs)
                resize(path+"/"+from[i]  ,200,200,50,"./"+index.relevantArgvs.destinionFolder+"/"+name.toString()+"."+imageType(buffer).ext);
        
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
 //   console.log("destination argv ",index.relevantArgvs.destinionFolder, 'all argvs',index.relevantArgvs)
    resize(index.relevantArgvs.folder+"/"+p.base ,200,200,50,"./"+index.relevantArgvs.destinionFolder+"/"+name.toString()+"."+p.ext);

}
module.exports ={
    HandleArguments:HandleArguments,
    HandleFile: HandleFile,
    CallreSize: CallreSize,
    FileResize: FileResize,
    resize:resize
};
