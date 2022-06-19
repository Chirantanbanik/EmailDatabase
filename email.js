var express = require('express');  // importing express and saving it.
var mysql = require('mysql');      // importing mysql.
var bodyParser = require("body-parser");   // importing bodyparser
var email = express();  // executing the entire express package that we have just imported.

email.set("view engine", "ejs");   // set some settings in our app
email.use(bodyParser.urlencoded({extended: true}));
email.use(express.static(__dirname + "/public"));    // we kept the static files in public folder so taking it from there for using.

var connection = mysql.createConnection({     // line 10-14 for Node.js and MySQL connection
  host     : 'localhost',
  user     : 'root',
  database : 'email_database'
});


email.get("/", function(request, response){   // route 
	
	var q = "Select count(*) As count From users";   // Find count of users in the database
	connection.query(q, function(err, results){
		if(err) throw err;
		// Respond with that count
		var count = results[0].count;
		//response.send("We have" + count + "users in the database"); 
		response.render("home", {count: count});
	});
});

email.post("/register", function(request, response){

	
var person = {
	email: request.body.email        // For Inserting new email 
};    
	
connection.query('Insert into users Set ?', person, function(err, result) {          // for inserting new email
  if(err) throw err;
  response.redirect("/");
    });
});
	
	//console.log("Post Request sent to /Register email is " + request.body.email);

email.listen(3000, function() {  // starts the server 
console.log('App is listening on port 3000');  // this will run when we start our server.
});
