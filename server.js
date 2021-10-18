require('dotenv').config()


// call all the required packages
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }))
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
app.get('/', function (req, res) {
	res.json({ message: 'WELCOME' });
});
// upload file to server and store in MONGGODB
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/getfiles", function(req, res) {

	db.collection('uploadfiles').findOne({ "pr_no": "01111010" }, (err, result) => {
		//console.log(result);
	
		 if (err) return console.log(err)
		
		  //res.json(result);
		  var a = result.fnames;
		  console.log(typeof(a));
		  
		  return res.json(result);
		  //var arrayToTable = require('array-to-table');
		  //arrayToTable = a;
		
	 })

    //res.json({ message: 'WELCOME' });   
});
/* app.post('/uploadfile', upload.array('myFile',10), (req, res) => {
// Define a JSONobject for the image attributes for saving to database
  const file = req.file
  db.collection('uploadfiles').insertOne({ "fname": file.path }, (err, result) => {
    console.log(result)
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
	})
}) */
// update PR-PO workflow
 const flowpo = [
	{
		prNo: 1,
		poNo: 1,
		sapPr: 1,
		sapPo: 1
	}
]
app.use(express.json())
app.post('/flowpo', (req, res) => {
	// res.json(posts.filter(post => post.userId === req.userId))
	const flow_po = req.body;
	db.collection('flow_po').insertOne(flow_po, (err, result) => {
		console.log(result)
	
		if (err) return console.log(err)
	
		console.log(req.body)
		res.redirect('/')
		})
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

app.post('/companycode', (req, res) => {
	client.query(`
	INSERT INTO public."COMPANYCODE'"(
		bukrs, description)
		VALUES ('0001', 'SAP Company code');
		`
	 , (err, result) => {
	if (err) throw err;
	console.log( err );
   //  client.end();
   });

})
app.get('/companycode', async (req, res) => {
	// const result = await client.query('SELECT $1::text as message', ['Hello world!'])
	// res.send(result.rows[0].message)
   })


   const { Client } = require('pg');

   const client = new Client({
	   user: 'postgres',
	   host: 'localhost',
	   database: 'MASTER_DATA',
	   password: '123456',
	   port: 5432,
   });
   
   client.connect((err, client) => {
	client.query(`
	 CREATE TABLE IF NOT EXISTS "COMPANYCODE'" (
	  bukrs char(4) PRIMARY KEY,
	  description text
	 );`
	  , (err, result) => {
	 if (err) throw err;
	 console.log('Created table "COMPANYCODE"');
	//  client.end();
	});
   });
//app.listen(3000, () => console.log('Server started on port 3000'));
