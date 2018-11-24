
const settings =require("./settings.json")
const prompt = require('prompt-sync')();
ff = require('node-find-folder');
const handler = require('./Handeler')
const validate = require('./Validate')
console.log(settings.result_folder);

var parseFromArgvs = ["--destinionFolder","--folder","--file" , "--UrlWeb","--Wd","--Hi"]

let  relevantArgvs 
let arguments = recievedArguments()

let validationErrors

// default  width  and hight 
function loadDef(hi,wd){

    if (typeof relevantArgvs.Wd==='undefined') relevantArgvs['Wd']= 200;
    if (typeof  relevantArgvs.Hi==='undefined') relevantArgvs['Hi'] =200;
    if (typeof  relevantArgvs.Hi==='undefined' && typeof relevantArgvs.Wd!=='undefined') relevantArgvs['Hi'] =200;
    if (typeof  relevantArgvs.Wd==='undefined' && typeof relevantArgvs.Hi!=='undefined') relevantArgvs['Hi'] =200;

}

Menu()
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
//the menu function 
function Menu(){

    //activate the print menu and the choosing option
    let choice= getCLIInput()

    //by reciving a number by user 
    switch(choice){
        //case 1 is for working with folder
        case '1':
            arguments = recievedArguments()
            ValidationErrors= validate.ValidateFolder(arguments)
            
            if(!ValidationErrors.length){
                loadDef()

               handler.HandleArguments(arguments)
        
             }
             break;
        //case 2 is for working with one file 

        case '2':
             arguments = recievedArguments()
             ValidationErrors= validate.ValidateFile(arguments)
        
                if(!ValidationErrors.length){
            
                loadDef()


               handler.HandleFile(arguments)
  
                 }
             break;
        //   case '3':
        //   arguments = recievedArguments()
        //   ValidationErrors= ValidateUrl(arguments)
          
        //         if(!ValidationErrors.length){
              
        //           handelWeb(arguments)
    
        //         }
        //     break;
        default:
            console.log("all done")
    }

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


