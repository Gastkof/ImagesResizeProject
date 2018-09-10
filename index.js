
// const pica = require("pica")();
const Jimp =require('jimp');
var Fakerator = require("fakerator");
var fs = require('fs');
const settings =require("./settings.json")
//const findUp = require('find-up');
const isImage = require('is-image');

console.log(settings.result_folder);


 
 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
// if(!fs.exists("./")){

// }

var path = process.argv[2];

function reSize(path){

fs.readdir(path, function(err, from) {
 
  //  console.log("my filez:",from);
  //  console.log("errrrror:",err);
    
 
var fakerator =Fakerator();


    console.log(from);
 
    for (var i=0; i<from.length; i++) {
        //check if evrey file is a image
      if( isImage(path.toString()+"/"+from[i].toString())){
        var name=fakerator.names.name();
      
        resize(path+"/"+from[i],200,200,50,"./respond/"+name.toString()+".jpg");

      }
   
    }

})
 
};

// recive  the width and hight for resize a image  
// also the quality and the diraction path with the full name of the resize image
function resize (from,wd,hi,qua,fileNameWithPath){
Jimp.read(from,(err,to)=>{
    if(err) throw err;
    to.resize(wd,hi).quality(qua).write(fileNameWithPath);
});
}


function func1(a,b,c){

   

        var i=0

        var listOfArguments = process.argv

        var ArratToCheck =["demoFolder","respond"]

        let ObjectResult={}
        ObjectResult = func2(listOfArguments,ArratToCheck) 

            ValidateArgs(ObjectResult)

            console.log("arguments:",JSON.stringify(ObjectResult))



        // if( !temp.some((val)=>{ return pathName === val }) ){
        //    console.log("error - no folder recieved "); 
        // }

        // temp.forEach((val,i,array)=>{

        //     if(val.toLocaleLowerCase() === pathName){

        //         if(array.length === i ){
          
        //             console.log("there are no folder enter again")
                 
              
        //         }
        //         else
        //         console.log(array[i+1])
        //     }


       // });

    
         
        


}

function func2(listOfArguments,ArratToCheck){

    let result=[];
   
    listOfArguments.forEach((val,i,arr)=> {
        
        try{
            //check if is the folder name
            if(arr[i]===ArratToCheck[0]){
                //check if the string entred is a folder
            fs.lstatSync("./"+arr[i].toString()).isDirectory()
            //call a function that resize the pictures
            reSize("./"+arr[i].toString())
            }
       }catch(e){
          // Handle error
          if(e.code == 'ENOENT'){
        console.log("no such thing")
          }else {
        
          }
       }




        // for(var j in ArratToCheck){
        //     if(arr[i]===ArratToCheck[j]){
        //         let ret = {}
        //         ret[ArratToCheck[j].toString()] = arr[i+1]
                
        //         result.push(ret)
        //     }
        // }

    });

    return result

}


function ValidateArgs(ObjectResult){

    console.log("who am i what am i :",typeof ObjectResult);
    

    ObjectResult.forEach(o=>{
        console.log("this here obj:",o);
        
    })


    // var arr=ObjectResult[Symbol.iterator]

    //     for(var j in arr){

    //         if( !j.some((val)=>{ return arr === val }) ){
    //             console.log("error - no folder recieved "); 

    //     }
   


    //      }


}


func1()
