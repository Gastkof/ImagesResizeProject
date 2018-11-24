//working on it
const Jimp =require('jimp');
const Fakerator = require("fakerator");
const fs = require('fs');
const settings =require("./settings.json")
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
var request = require("request");
var HTMLParser = require('node-html-parser');
const download = require('image-downloader')
ff = require('node-find-folder');
const handler = require('./Handeler')
const validate = require('./Validate')


//function that handel web
function handelWeb(arguments){
    var webi = []
    try{

        request(
            { uri:arguments.UrlWeb},
            function(error, response, body) {
              web= body;

            //   var htmlTagRe = /<\/img[\w\src="/.':;#-\/\img]+>/gi;
            //   var regex = /<img.*?src='(.*?)'/;

              //the root of the web page  
              var root = HTMLParser.parse(web);
            //   console.log(root.querySelectorAll('img',root.rawAttrs))
                var splitArrayOfSrc =root.querySelectorAll(('img'))
                var rawSrc =[]
                for(var src in splitArrayOfSrc ){
                
                    rawSrc[src]=splitArrayOfSrc[src].rawAttrs

                }
                // rex = /src="?([^"\s]+)"?\s*\/>/g;

                for(var j in rawSrc){
                    webi.push(rawSrc[j].split(" "))
                }

                    console.log("this is my type", typeof webi)
                    console.log("my data", webi)
                        var b= webi[0][0].replace('src=','')
                         console.log(relevantArgvs.UrlWeb+b.slice(1,b.length-1))
                    
                                               
                        //   console.log ( "this my type", p)
                          const options = {
                            url: relevantArgvs.UrlWeb+b.slice(1,b.length-1),
                            dest: "./demoFolder"  // Save to /path/to/dest/image.jpg
                          }
                           
                          download.image(options)
                            .then(({ filename, image }) => {
                                FileResize(filename)
                              console.log('File saved to', filename)
                            })
                            .catch((err) => {
                              console.error(err)
                            })
                        
                    
     
                }
        );
    
        handler.HandleArguments(arguments)

       }catch(e){
          // Handle error
            console.error("recieved error while handling file: ",e);
       }
           
}

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
    resize(img ,200,200,50,"./"+relevantArgvs.destinionFolder+"/"+name.toString()+"."+p.ext);

}