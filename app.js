//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

  var firstName=req.body.fName;
  var lastName= req.body.lName
  var email= req.body.email;
  var phoneNumber=req.body.number;
  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);
  const url="https://us17.api.mailchimp.com/3.0/lists/dfab1eb03f"
  const options={
     method:"POST",
     auth:"umirbek:4f6e946f2e61a351f69ef4c69e61b88a-us17"
  }

  const request = https.request(url, options,  function (response) {

  if (response.statusCode=== 200) {
    res.sendFile(__dirname + "/success.html");
  } else{
    res.sendFile(__dirname + "/failure.html");
  }

    response.on("data", function (data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();

  });

app.post("/failure", function(req, res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running on port 3000");
});
//4f6e946f2e61a351f69ef4c69e61b88a-us17
//dfab1eb03f
