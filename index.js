
// const pica = require("pica")();
const Jimp =require('jimp');
const settings =require("./settings.json")
console.log(settings.result_folder)

let from = process.argv[2]
let to = process.argv[3]

Jimp.read(from,(err,to)=>{
    if(err) throw err;
    to.resize(150,250).quality(50).write("./miniImages/13.jpg");
});


function func1(a,b,c){

   

        var i=0

        var listOfArguments = process.argv

        var ArratToCheck =["folder","fieName"]

        let ObjectResult={}
        ObjectResult = func2(listOfArguments,ArratToCheck) 

            ValidateArgs(ObjectResult)

            console.log("arguments:",JSON.stringify(ObjectResult))



      //  {"folder":"gargoyle","fieName":"regret"}
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
        

        for(var j in ArratToCheck){
            if(arr[i]===ArratToCheck[j]){
                let ret = {}
                ret[ArratToCheck[j].toString()] = arr[i+1]
                
                result.push(ret)
            }
        }

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
