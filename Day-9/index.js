const express = require('express');
const app = express();
const path = require('path');

console.log(__dirname);

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "jade");
app.use('/',(req,res) => {
    /*Sendfile sends file to front end and path.join is used to append the current directory to the specified path*/ 
  //  res.sendFile(path.join(__dirname,"public/images/84631.jpg"));
    // res.download
    //res.download(path.join(__dirname,"public/images/84631.jpg"),"download.jpg");
    res.render('index',{title:"Express"})
})

app.listen(3000);