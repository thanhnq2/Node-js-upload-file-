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
		cb(null, file.originalname ) // + '-' + Date.now())
	}
})

var upload = multer({ storage: storage })

app.get('/', function (req, res) {
	res.json({ message: 'WELCOME' });
});
app.use(express.json())
// upload file to server and store in DB
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {

	const file = req.file

	client.query(`
	INSERT INTO public."FILE_STORAGE"(
		FILE_PATH)
		VALUES ('${file.path}')
		RETURNING *;
		`
		, (err, result) => {
			if (err) throw err;
			console.log('saved to database')
			return res.json(result.rows.id);

			// res.redirect('/')
		});

})

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
//  get multi files
app.get("/getfiles", function (req, res) {
	
	const text = 'SELECT * FROM public."FILE_STORAGE" where ID IN(SELECT UNNEST($1::int[]))'

	// const { id } = request.body
	console.log(req.body)
	var a = []

	var ID = req.body.map(id => {
		var b = []
		b.push(id.ID)
		a.push(b)

	})

	console.log(a)
	// promise

	client
	.query(text,[a])
	.then(res1 => {
		console.log(res1.rows)
		let result = res1.rows
		return res.json(result)
	})
	.catch(e => console.error(e.stack))

});

// upload multi files 
app.post('/uploadfiles', upload.array('myFile', 10), (req, res) => {

	const files = req.files
	var a = []
    
	var paths = req.files.map(file => {
		var b = []
		b.push(file.path)
		a.push(b)

	})
	console.log(a)
	console.log(typeof (paths))


		const text = 'INSERT INTO public."FILE_STORAGE"(FILE_PATH) SELECT * FROM UNNEST ($1::text[]) RETURNING *'
		const values = paths

		// promise
		client
			.query(text, [a])
			.then(res1 => {
				console.log(res1.rows)
				let result = res1.rows
				return res.json(result)
			})
			.catch(e => console.error(e.stack))

    
})
// PR attack file
app.post('/pr_attach', (req, res) => {

    const text = 'INSERT INTO public."PR_ATTACH"(pr_no, user_id) SELECT * FROM UNNEST ($1::text[], $2::text[]) RETURNING *'	
	var a = []

	var PR_NO = req.body.map(ID => {
		var b = []
		b.push(ID.PR_NO)
		a.push(b)

	})

	console.log(a)
	// promise

	client
	.query(text,[a])
	.then(res1 => {
		console.log(res1.rows)
		let result = res1.rows
		return res.json(result)
	})
	.catch(e => console.error(e.stack))

})

// get pr attack file
app.post('/pr_attach', (req, res) => {

    const text = 'SELECT * FROM public."PR_ATTACH" where pr_no IN(SELECT UNNEST($1::text[]))'	
	var a = []
        var c = []
		var ID = req.body.map(id => {
			var b = []
			b.push(id.PR_NO)
			a.push(b)
			b = []
			b.push(id.USER_ID)
			c.push(b)
	
		})
		console.log(a)
		console.log(c)

		// promise
		client
			.query(text, [[a],[c]])
			.then(res1 => {
				console.log(res1.rows)
				let result = res1.rows
				return res.json(result)
			})
			.catch(e => console.error(e.stack))

})

// company code master data
app.post('/companycode', (req, res) => {

		const text = 'INSERT INTO public."COMPANYCODE"(bukrs, butxt) SELECT * FROM UNNEST ($1::text[], $2::text[]) RETURNING *'	
		var a = []
        var c = []
		var ID = req.body.map(id => {
			var b = []
			b.push(id.BUKRS)
			a.push(b)
			b = []
			b.push(id.BUTXT)
			c.push(b)
	
		})
		console.log(a)
		console.log(c)

		// promise
		client
			.query(text, [[a],[c]])
			.then(res1 => {
				console.log(res1.rows)
				let result = res1.rows
				return res.json(result)
			})
			.catch(e => console.error(e.stack))

})
app.get('/companycode', (req, res) => {

	const text = 'SELECT * FROM public."COMPANYCODE" where BUKRS IN(SELECT UNNEST($1::text[]))'

	// const { id } = request.body
	console.log(req.body)
	var a = []

	var BUKRS = req.body.map(ID => {
		var b = []
		b.push(ID.BUKRS)
		a.push(b)

	})

	console.log(a)
	// promise

	client
	.query(text,[a])
	.then(res1 => {
		console.log(res1.rows)
		let result = res1.rows
		return res.json(result)
	})
	.catch(e => console.error(e.stack))
})

// Plant master data
app.post('/plant', (req, res) => {

	const text = 'INSERT INTO public."PLANT"(werks, name1) SELECT * FROM UNNEST ($1::text[], $2::text[]) RETURNING *'	
	var a = []
	var c = []
	var ID = req.body.map(id => {
		var b = []
		b.push(id.WERKS)
		a.push(b)
		b = []
		b.push(id.NAME1)
		c.push(b)

	})
	console.log(a)
	console.log(c)

	// promise
	client
		.query(text, [[a],[c]])
		.then(res1 => {
			console.log(res1.rows)
			let result = res1.rows
			return res.json(result)
		})
		.catch(e => console.error(e.stack))

})
app.get('/plan', (req, res) => {

const text = 'SELECT * FROM "PLANT" where werks IN(SELECT UNNEST($1::text[]))'

// const { id } = request.body
console.log(req.body)
var a = []

var BUKRS = req.body.map(ID => {
	var b = []
	b.push(ID.WERKS)
	a.push(b)

})

console.log(a)
// promise

client
.query(text,[a])
.then(res1 => {
	console.log(res1.rows)
	let result = res1.rows
	return res.json(result)
})
.catch(e => console.error(e.stack))
})

// Purchasing org master data
app.post('/pur_org', (req, res) => {

	const text = 'INSERT INTO public."PUR_ORG"(ekorg, ekotx) SELECT * FROM UNNEST ($1::text[], $2::text[]) RETURNING *'	
	var a = []
	var c = []
	var ID = req.body.map(id => {
		var b = []
		b.push(id.EKORG)
		a.push(b)
		b = []
		b.push(id.EKOTX)
		c.push(b)

	})
	console.log(a)
	console.log(c)

	// promise
	client
		.query(text, [[a],[c]])
		.then(res1 => {
			console.log(res1.rows)
			let result = res1.rows
			return res.json(result)
		})
		.catch(e => console.error(e.stack))

})
app.get('/pur_org', (req, res) => {

const text = 'SELECT * FROM "PUR_ORG" where ekorg IN(SELECT UNNEST($1::text[]))'

// const { id } = request.body
console.log(req.body)
var a = []

var BUKRS = req.body.map(ID => {
	var b = []
	b.push(ID.EKORG)
	a.push(b)

})

console.log(a)
// promise

client
.query(text,[a])
.then(res1 => {
	console.log(res1.rows)
	let result = res1.rows
	return res.json(result)
})
.catch(e => console.error(e.stack))
})

// Purchasing group master data
app.post('/pur_group', (req, res) => {

	const text = 'INSERT INTO public."PUR_GROUP"(ekgrp, eknam) SELECT * FROM UNNEST ($1::text[], $2::text[]) RETURNING *'	
	var a = []
	var c = []
	var ID = req.body.map(id => {
		var b = []
		b.push(id.EKGRP)
		a.push(b)
		b = []
		b.push(id.EKNAM)
		c.push(b)

	})
	console.log(a)
	console.log(c)

	// promise
	client
		.query(text, [[a],[c]])
		.then(res1 => {
			console.log(res1.rows)
			let result = res1.rows
			return res.json(result)
		})
		.catch(e => console.error(e.stack))

})
app.get('/pur_group', (req, res) => {

const text = 'SELECT * FROM "PUR_GROUP" where ekorg IN(SELECT UNNEST($1::text[]))'

// const { id } = request.body
console.log(req.body)
var a = []

var BUKRS = req.body.map(ID => {
	var b = []
	b.push(ID.EKGRP)
	a.push(b)

})

console.log(a)
// promise

client
.query(text,[a])
.then(res1 => {
	console.log(res1.rows)
	let result = res1.rows
	return res.json(result)
})
.catch(e => console.error(e.stack))
})

const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'MASTER_DATA',
	password: '123456',
	port: 5432,
});

// Create Table Master data
client.connect((err, client) => {
	client.query(`
	 CREATE TABLE IF NOT EXISTS "COMPANYCODE" (
	  bukrs char(4) PRIMARY KEY,
	  butxt text
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

	client.query(`
	 CREATE TABLE IF NOT EXISTS "PURC_ORG" (
		EKORG char(4) PRIMARY KEY,
		EKOTX text
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

	client.query(`
	 CREATE TABLE IF NOT EXISTS "PLANT" (
		WERKS char(4) PRIMARY KEY,
		NAME1 text
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

	client.query(`
	 CREATE TABLE IF NOT EXISTS "PUR_GROUP" (
		EKGRP char(4) PRIMARY KEY,
		EKNAM text
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

	client.query(`
	 CREATE TABLE IF NOT EXISTS "FILE_STORAGE" (
		ID SERIAL PRIMARY KEY,
		FILE_PATH text
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

	client.query(`
	 CREATE TABLE IF NOT EXISTS "PR_ATTACH" (
		ID SERIAL PRIMARY KEY,
		PR_NO char(10),
		user_id char(12)
	 );`
		, (err, result) => {
			if (err) throw err;
			console.log('Initial successfull"');
			//  client.end();
		});

});
app.listen(3000, () => console.log('Server started on port 3000'));
