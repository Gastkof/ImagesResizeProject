
let settings =require("./settings.json")
const prompt = require('prompt-sync')();
ff = require('node-find-folder');
const handler = require('./Handeler')
const validate = require('./Validate')
const readlineSync = require('readline-sync');
// console.log(settings.result_folder);

var parseFromArgvs = ["--destinionFolder","--folder","--file" , "--UrlWeb","--Wd","--Hi","--nofile"]



let  relevantArgvs 
// let arguments = recievedArguments()
main();


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
        }
    })

  relevantArgvs =result

    return result;
}


function preValidation(args){

    if(!Boolean(args.folder))  args.folder = readlineSync.question("Type source Folder (default "+ settings.folder +"): ");
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

//prints the menu options 
//get the choose by user
function getCLIInput(){
    let menuCoice = -1;

    console.log("for choose the options")
    console.log("1 for get a folder")
    console.log("2 for work with file")
    console.log("3 for exit")
    console.log("**********************")
    menuCoice =prompt("enter your chooise:")

    if(menuCoice === 3)  exit;

    if (menuCoice>0 && menuCoice < 3)   return menuCoice

    if(menuCoice<0)  return getCLIInput()
}



