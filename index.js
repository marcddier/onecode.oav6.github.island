const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require("body-parser");
const session = require("express-session"); 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(session({secret:'ssshhhhhh'}));

const sequelize = new Sequelize ('mydb','root','root', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: 'myDb.sqlite'
});

sequelize
	.authenticate()
	.then(() => { 
			console.log('connection has been establish successfully.')
	})
	.catch((err) => {
			console.error('Unable to connect to the database',err)
	});

// const User = sequelize.define('users', {
// 	nickname: {
// 			type: Sequelize.STRING
// 	},
// 	email: Sequelize.STRING,
// 	password: {
// 			type: Sequelize.STRING
// 	},
// 	fullname: Sequelize.STRING
// });

// sequelize
// 	.sync()
// 	.then(() => {
// 		// Table created
// 		User.create({
// 		nickname: 'oda',
// 		email: 'oda@sama.fr',
// 		password: 'sama',
// 		fullname: 'eiichiro oda'
// 		});
// 	});

require("./routes/users.js")(app);

// User.findAll().then(user => {
//   console.log(user)
// }) 

app.listen(4242, () => {
	console.log("Listening on port 4242");
});
