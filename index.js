
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
const locatePath = require('locate-path');
var validator = require('validator');
const makeDir = require('make-dir');
const prompt = require('prompt-sync')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var request = require("request");
var stringToDom = require('string-to-dom');
const dom1 = new JSDOM();
var HTMLParser = require('node-html-parser');

var getImgSrc = require('get-img-src')
var ff, ff_result;
 
ff = require('node-find-folder');
const handler = require('./Handeler')
const validate = require('./Validate')

console.log(settings.result_folder);


var parseFromArgvs = ["--destinionFolder","--folder","--file" , "--UrlWeb"]
  let  relevantArgvs 
let arguments = recievedArguments()
let validationErrors
var fakerator =Fakerator();
let web 

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
        arguments = recievedArguments()
             ValidationErrors= validate.ValidateFolder(arguments)
            
            if(!ValidationErrors.length){
                
               handler.HandleArguments(arguments)
        
        }
        break;
        case '2':
        arguments = recievedArguments()
             ValidationErrors= validate.ValidateFile(arguments)
        
              if(!ValidationErrors.length){
            
               handler.HandleFile(arguments)
  
              }
          break;
          case '3':
          arguments = recievedArguments()
          ValidationErrors= ValidateUrl(arguments)
          
                if(!ValidationErrors.length){
              
                  handelWeb(arguments)
    
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

   
  let  result={}
    listOfArguments.forEach((val,i,arr)=>{
          for(var j in ArratToCheck){
            if(arr[i]===ArratToCheck[j]){
            
                result[arr[i].replace("--","")]=arr[i+1]
            }
        }
    })

  relevantArgvs =result
  module.exports.relevantArgvs=relevantArgvs
     return result;
}

module.exports={
    Menu:Menu,
    recievedArguments: recievedArguments,
};
// module.exports.relevantArgvs=relevantArgvs

// //function that handel all arguments
// function HandleArguments(arguments){

//    for(var i in arguments) {

//     try{
//         //check if is the folder name
//         if(arguments[i]===("demoFolder")){
//             //check if the string entred is a folder
      

//         //call a function that resize the pictures
//         CallreSize("./"+arguments[i].toString())
//         }
//    }catch(e){
//       // Handle error
//       if(e.code == 'ENOENT'){
//          console.log("no such thing")
//       }else {
//         console.error("recieved error while handling arguments: ",e);
        
//       }
//    }
// }
// }

//function that handel web
function handelWeb(arguments){
        var webi = []
        var rootSRc =[]
        try{

            request(
                { uri:arguments.UrlWeb},
                function(error, response, body) {
                  web= body;

                  var htmlTagRe = /<\/img[\w\src="/.':;#-\/\img]+>/gi;
                  var regex = /<img.*?src='(.*?)'/;

                  var root = HTMLParser.parse(web);
                  console.log(root.querySelectorAll('img',root.rawAttrs))
                    webi.push(root.querySelectorAll(root.rawAttrs))
             
                    for(var ro in webi){
                        rootSRc.push(webi[ro])
                        //FileResize(webi[ro].rawAttrs)
    
                    }
          
                  console.log(webi) 
                }
            );
        
            

           }catch(e){
              // Handle error
                console.error("recieved error while handling file: ",e);
           }
               
}
// //validate of all arguments
// function ValidateFolder(parsedArguments){
//     var errorList=[]

//     for(var i in parsedArguments){
      
//         if(i==="folder"){
//             try {
//                 if(fs.existsSync("./"+parsedArguments[i].toString())){

//                 }
//                 else{
//                     console.log("source folder dosnt exist")
//                     errorList.push("source folder dosnt exist")
//                     exit
//                 }
//             } catch (e) {
//                 console.error(" there is no folder :",e)
//             }
//         }
//         if(i === "destinionFolder"){
//             try{
//                 if(!fs.existsSync("./"+parsedArguments[i].toString())){
//                     var newFolder =   fs.mkdir(parsedArguments[i])

//                 }

//             }
//             catch (e) {
//                 console.error("there is no destination folder:  ",e)

//             }
//         }
//      }
//     return errorList

// }
function ValidateUrl(ObjectResult){

    var errorList=[]  
    
    for(var i in ObjectResult){
        console.log("this is my obj ", ObjectResult)
        if(i==='UrlWeb'){
        
            try {
              

                    if(validator.isURL(ObjectResult.UrlWeb)){
                        console.log("this is my type ",typeof ObjectResult[i])
                     
                    }
                    else{
                        console.log("file dosnt exist")
                        errorList.push("file dosnt exist")
                        exit
                    }

                }catch (e) {
                    console.error(" ",e)
                }
              
            }
         } 
    return errorList
}
    
