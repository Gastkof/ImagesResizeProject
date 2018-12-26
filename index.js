
let settings =require("./settings.json")
const prompt = require('prompt-sync')();
ff = require('node-find-folder');
const handler = require('./Handeler')
const validate = require('./Validate')
const readlineSync = require('readline-sync');
// console.log(settings.result_folder);

var parseFromArgvs = ["--destinionFolder","--originFolder","--file" , "--UrlWeb","--Wd","--Hi","--nofile","--Help"]



let  relevantArgvs 
// let arguments = recievedArguments()
main();

//main function that deal with the arguments
function main(){
    let enteredArgs = recievedArguments()
    enteredArgs = preValidation(enteredArgs)
    let ValidationErrors= validate.ValidateFolder(enteredArgs);

    if(ValidationErrors)
     console.log("validation errors:",ValidationErrors)  
    loadDef(enteredArgs)
    // console.log("condition:",enteredArgs)

    if (enteredArgs.nofile)  handler.HandleArguments(enteredArgs)
    if (!enteredArgs.nofile )  handler.HandleFile(enteredArgs)

    
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
            if(arr[i]==="--Help"|| arr[i]==="Help"){

                HelpGuide();
            }

        }
    })

  relevantArgvs =result

    return result;
}

//functio that recived argumets and check the them before Validation
function preValidation(args){

    if(!Boolean(args.originFolder))  args.originFolder = readlineSync.question("Type source originFolder (default "+ settings.originFolder +"): ");
    if(!Boolean(args.destinionFolder))  args.destinionFolder = readlineSync.question("Type destinion Folder (default "+ settings.destinionFolder +"): ");
    // TODO: check when file is empty done
    if(!Boolean(args.file) && !Boolean(args.nofile)){console.error("no entered file and nofile ")}
  if(!Boolean(args.file) && Boolean(args.nofile) ) {
      args.nofile= true
  }

  else
    args.nofile=false
    return args;
  
}

// default  width  and hight 
function loadDef(args){

    if (typeof args.Wd==='undefined') args['Wd']= 200;
    if (typeof  args.Hi==='undefined') args['Hi'] =200;
    if (typeof  args.Hi==='undefined' && typeof args.Wd!=='undefined') args['Hi'] =200;
    if (typeof  args.Wd==='undefined' && typeof args.Hi!=='undefined') args['Hi'] =200;

    return args;
}


//Help Guide Function

function HelpGuide(){
    console.log('Guide Optuions :');

    console.log( "--originFolder , \t the origin folder that need to be enter ");
    console.log( "--destinionFolder ,\t the destination folder that need to be enter  or if no exists creates one");
    console.log( "--file ,\t image name that you wnat to resize or if no entered takes all folder");
    console.log( "--nofile, \t enter true or false and not insers file name");
    console.log( "--Wd ,\t enter true or false and not insers file name");
    console.log( "--Hi ,\t enter true or false and not insers file name");
    console.log( "--help ");

    process.exit(0);


}


