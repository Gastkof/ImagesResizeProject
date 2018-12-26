const Fakerator = require("fakerator");
const fs = require('fs');
const settings =require("./settings.json")
const path = require('path');
const filepath = require('filepath');
const ifIsImage = require('if-is-image');
console.log(settings.result_folder);

//Validation for of folder that inserted
function ValidateFolder(parsedArguments){
    var errorList=[]

    //thii is the problem
    var filep = path.resolve(parsedArguments.originFolder)

    for(var i in parsedArguments){
      
        if(i==="originFolder"){
            try {
            
                if((fs.existsSync("./"+parsedArguments[i].toString()))){
                    
                }
                else{
                    console.log("source originFolder dosnt exist")
                    errorList.push("source originFolder dosnt exist")
                    exit
                }
            } catch (e) {
                console.error(" there is no originFolder :",e)
                errorList.push(e)
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
                errorList.push(e)
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
                errorList.push(e)
            }
    return errorList
}

module.exports ={
    ValidateFile: ValidateFile,
    ValidateFolder :ValidateFolder

} 


