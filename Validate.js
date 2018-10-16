    // const Jimp =require('jimp');
const Fakerator = require("fakerator");
const fs = require('fs');
const settings =require("./settings.json")
// const isImage = require('is-image');
// const imageType = require('image-type');
const filepath = require('filepath');
const ifIsImage = require('if-is-image');
// const path = require('path');
// const readChunk = require('read-chunk');
// const locatePath = require('locate-path');
// var fakerator =Fakerator();
// const makeDir = require('make-dir');
// const prompt = require('prompt-sync')();
console.log(settings.result_folder);


// const index = require('./index')
// const handler = require('./Handeler')

function ValidateFolder(parsedArguments){
    var errorList=[]

    for(var i in parsedArguments){
      
        if(i==="folder"){
            try {
                if(fs.existsSync("./"+parsedArguments[i].toString())){

                }
                else{
                    console.log("source folder dosnt exist")
                    errorList.push("source folder dosnt exist")
                    exit
                }
            } catch (e) {
                console.error(" there is no folder :",e)
            }
        }
        if(i === "destinionFolder"){
            try{
                if(!fs.existsSync("./"+parsedArguments[i].toString())){
                    var newFolder =   fs.mkdir(parsedArguments[i])

                }

            }
            catch (e) {
                console.error("there is no destination folder:  ",e)

            }
        }
     }
    return errorList

}
//validate of one argument
function ValidateFile(ObjectResult){

    var errorList=[]    
            try {
                var filep=filepath.create(ObjectResult.file);

                const isIm= ifIsImage(filep.toString());  
                console.log(isIm.toString())
                if(isIm){

                }
                else{
                    console.log("file dosnt exist")
                    errorList.push("file dosnt exist")
                    exit
                }
            } catch (e) {
                console.error(" ",e)
            }
    return errorList
}

module.exports ={
    ValidateFile: ValidateFile,
    ValidateFolder :ValidateFolder

} 


