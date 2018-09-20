
// const pica = require("pica")();
const Jimp =require('jimp');
var Fakerator = require("fakerator");
var fs = require('fs');
const settings =require("./settings.json")
//const findUp = require('find-up');
const isImage = require('is-image');
const imageType = require('image-type');

const readChunk = require('read-chunk');

const makeDir = require('make-dir');

console.log(settings.result_folder);

//var folder =arguments[0].toString()
//var destinionFolder= arguments[1].toString()
var parseFromArgvs = ["--destinionFolder","--folder"]
var relevantArgvs 

var fakerator =Fakerator();


function Menu(){

    console.log("for choose the options")
    console.log("1 for get a folder")
    console.log("2 for work with file")
    console.log("3 for work witch a website")
    console.log("4 for exit")




    let chooice =1

    switch(chooice){

        case 1:
        {

      
        }
    }



}



let arguments = recievedArguments()
let ValidationErrors= ValidateArgs(arguments)

if(!ValidationErrors.length){
    
    HandleArguments(arguments)

}

//var path = process.argv[2];

function CallreSize(path){

    fs.readdir(path, function(err, from) {
    
    //  console.log("my filez:",from);
    //  console.log("errrrror:",err);
        
    


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
   // to.write("./respond/"+makeDir("orgin").toString())
});
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



