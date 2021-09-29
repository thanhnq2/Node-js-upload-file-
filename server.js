require('dotenv').config()

/* const express = require('express')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middleware/auth')
const app = express()

app.use(express.json()) */

// database

/* const posts = [
	{
		userId: 1,
		post: 'post henry'
	},
	{
		userId: 2,
		post: 'post jim'
	},
	{
		userId: 1,
		post: 'post henry 2'
	}
]

// app
app.get('/posts', verifyToken, (req, res) => {
	res.json(posts.filter(post => post.userId === req.userId))
})
app.post('/api/company',verifyToken, (req, res) => {
	const id = 'i8Lhazl2J9lED12iRFRUzVshU0/u6oTV5ZzVM3JBw24937gmv0zjZ197RY7Bi2e5'
	const accessToken = jwt.sign(
		{ id },
		process.env.ACCESS_TOKEN_SECRET,
		{
			// expiresIn: '20s'
		}
	)
	console.log(req.body.bukrs)
	res.json(accessToken)
})
app.post('/check', (req, res) => {
	const tocKen = req.body.tocKen
	try {
		jwt.verify(tocKen, process.env.ACCESS_TOKEN_SECRET)

		res.json('success')
	} catch (error) {
		// var moment = require('moment')
		// var created = moment().format(error.expiredAt)
		var datetimeTocken = new Date(error.expiredAt);
		var datetimeCurrent = new Date();

		// var timeStampTocken = datetimeTocken.getTime();
		// var timeStampCurrent = datetimeCurrent.getTime();
		// var d = timeStampCurrent - timeStampTocken;
		var seconds = Math.floor((datetimeCurrent - (datetimeTocken))/1000);
		var minutes = Math.floor(seconds/60);
		var hours = Math.floor(minutes/60);
		var days = Math.floor(hours/24);

		hours = hours-(days*24);
		minutes = minutes-(days*24*60)-(hours*60);
		seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

		res.sendStatus(error)
		console.log(error)
	}

	res.json(accessToken)
})
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Ser ver started on port ${PORT}`)) */
// var express = require('express')
// const http = require("http");
// var app = express();
// const server = http.createServer(app);

// const socketIo = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   }
// });
// // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 

// // socketIo.on("connection", function (socket) {
// //   console.log("New client connected " + socket.id); 
// //   socket.on('sendDataClient', function (msg) {
// //     console.log('vao day'); 
// //     socketIo.emit('chat message', msg);
// //   });
// // });
// const user = {
//   date:'ngay nao do vang em'
// }
// socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
//   console.log("New client connected " + socket.id); 

//   socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
//     console.log(data)
//     socketIo.to(socket.id).emit("sendDataServer", { user });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
//   })
//   socket.on("disconnect", () => {
//     console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
//   });
// });

// server.listen(3001, () => {
//   console.log('Server đang chay tren cong 3001 hehehe');
// }); */
// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({extended: true}))
// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'Uploads')
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now())
	}
  })
   
  var upload = multer({ storage: storage }) 
//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });   
});
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
// Define a JSONobject for the image attributes for saving to database
  const file = req.file
  db.collection('uploadfiles').insertOne({ "fname": file.path }, (err, result) => {
    console.log(result)

    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
})

/* 	const file = req.file
	if (!file) {
	  const error = new Error('Please upload a file')
	  error.httpStatusCode = 400
	  return next(error)
	}
	res.send(file) */
  })
 
  const MongoClient = require('mongodb').MongoClient
  const myurl = 'mongodb://localhost:27017';
   
  MongoClient.connect(myurl, (err, client) => {
	if (err) return console.log(err)
	db = client.db('TEST_DB') 
	app.listen(3000, () => {
	  console.log('listening on 3000')
	})
  })  
//app.listen(3000, () => console.log('Server started on port 3000'));