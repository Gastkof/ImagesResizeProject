# shriqpic

image resize program

Shrinking pic

An project that have depndes with other moudols 

For a single folder o`r file, check if the file is an image or the folder contains images, 
for all images / image size is aggregated according to the input width and length by the user if not inserted by the user
<br>

The width will be a default of 200
<br>

The Hight will be a default of 200 
Supported type:
All type off images
such as:

*jpg
*png
*gif

example of use :

node index.js --folder origin (folder name that contains the images) --destinionFolder destination(folder name of the destination)

if enter folder name and destinionFolder without file name :


node index.js --folder origin  --destinionFolder destination --nofile true

if needed to work with one image enter like this:

 node index.js --folder origin  --destinionFolder destination --file  /*file name*/ (name.jpg) 






