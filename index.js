
const pica = require("pica")();
const Jimp =require('jimp');
var Fakerator = require("fakerator");
var fs = require('fs');
const settings =require("./settings.json")
//const findUp = require('find-up');
const isImage = require('is-image');
const imageType = require('image-type');
var filepath = require('filepath');
const ifIsImage = require('if-is-image');
const path = require('path');
const readChunk = require('read-chunk');
const locatePath = require('locate-path');

const makeDir = require('make-dir');
var prompt = require('prompt-sync')();

var ff, ff_result;
 
ff = require('node-find-folder');

console.log(settings.result_folder);


var parseFromArgvs = ["--destinionFolder","--folder","--file"]
var relevantArgvs 
let arguments
let ValidationErrors
var fakerator =Fakerator();

Menu()


function getCLIInput(){
    let menuCoice = -1;

    console.log("for choose the options")
    console.log("1 for get a folder")
    console.log("2 for work with file")
    console.log("3 for work witch a website")
    console.log("4 for exit")
    console.log("**********************")
    menuCoice =prompt("enter your chooise:")

    if(menuCoice === 4)  exit;

    if (menuCoice>0 && menuCoice < 4)   return menuCoice

    if(menuCoice<0)  return getCLIInput()

}


function Menu(){

    let choice= getCLIInput()


    
    switch(choice){

        case '1':
        
            // let Folder =prompt("enter the folder name")
            // ff_result= new ff(Folder);
            // let destination = prompt("enter the destination folder")


             arguments = recievedArguments()
             ValidationErrors= ValidateArgs(arguments)
            
            if(!ValidationErrors.length){
                
                HandleArguments(arguments)
            
            
      
        }
        break;
        case '2':
             arguments = recievedArguments()
             ValidationErrors= ValidateFile(arguments)
        
              if(!ValidationErrors.length){
            
                HandleFile(arguments)
        
        
  
              }
          break;

        default:
            console.log("all done")


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
                console.log("destination argv ",relevantArgvs.destinionFolder, 'all argvs',relevantArgvs)
                resize(path+"/"+from[i]  ,200,200,50,"./"+relevantArgvs.destinionFolder+"/"+name.toString()+"."+imageType(buffer).ext);
        
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
     //const buffer = readChunk.sync(p1, 0, 12);
    console.log("destination argv ",relevantArgvs.destinionFolder, 'all argvs',relevantArgvs)
    resize(relevantArgvs.folder+"/"+p.base ,200,200,50,"./"+relevantArgvs.destinionFolder+"/"+name.toString()+"."+p.ext);

}


//recieves args and starts processing
function recievedArguments(){

   
    if (process.argv.length <= 2) {
        console.log("nothing entred");
        process.exit(-1);
    }

    var listOfArguments = process.argv
    var ArratToCheck = parseFromArgvs

    let result={};

    listOfArguments.forEach((val,i,arr)=>{
          for(var j in ArratToCheck){
            if(arr[i]===ArratToCheck[j]){
            
                result[arr[i].replace("--","")]=arr[i+1]
            }
        }
    })

     relevantArgvs =result
     return result;
}


//function that handel all arguments
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
    
      }

   }
   



   // return result

}
}

//function that handek one file 
function HandleFile(arguments){
    
    console.log("here bro",arguments);
    
    for(var i in arguments) {

    try{
        // //check if is the folder name
        // if(arguments1[i]===("demoFolder")){
            //     //check if the string entred is a folder
            
            
            // //call a function that resize the pictures
            // CallreSize("./"+arguments1[i].toString())
            // }
            console.log(arguments[i].toString())
            console.log("comparison:::::",  arguments[i]==="file.jpg")
            const isIm= ifIsImage(arguments[i].toString());  
            if((isIm)){
                console.log("n if");
                
                FileResize(arguments[i].toString())
            }
       }catch(e){
          // Handle error
          if(e.code == 'ENOENT'){
            console.log("no such thing")
          }else {
        
          }
    
       }
       
    
    
    
       // return result
    
    }
}
//validate of all arguments
function ValidateArgs(ObjectResult){

    console.log("who am i what am i :", ObjectResult);

    var errorList=[]

    for(var i in ObjectResult){
      
        if(i==="folder"){
            try {
                if(fs.existsSync("./"+ObjectResult[i].toString())){


                }

                else{
                    console.log("source folder dosnt exist")
                    errorList.push("source folder dosnt exist")
                    exit
                }
            } catch (error) {
                
            }
        if(i === "destinionFolder"){
            try{
                if(!fs.existsSync("./"+ObjectResult[i].toString())){
                    var newFolder =   fs.mkdir(ObjectResult[i])

                }
                

            }
            catch (error) {
                
            }
        }
    }


    }
    return errorList



}
//validate of one argument

function ValidateFile(ObjectResult){

    var errorList=[]
    
      console.log("test:",ObjectResult,ObjectResult.file,ObjectResult.file==="file.jpg")
    
            try {
                var filep=filepath.create(ObjectResult.file);

                const isIm= ifIsImage(filep.toString());  
                console.log(isIm.toString())
                if(isIm){}
     

                else{
                    console.log("file dosnt exist")
                    errorList.push("file dosnt exist")
                    exit
                }
            } catch (error) {
                
            }

       
    


    
    return errorList
    
}



