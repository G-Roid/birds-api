require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const { response } = require('express')
const path = require("path");
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

const { storage } = require('./storage/storage');
const multer = require('multer');
const upload = multer({ storage });



let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'birdsDatabase',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        db = client.db(dbName)
        collection = db.collection("birds")
        console.log(`connected to database ${dbName}`)
    })
    .catch(error => console.error(error))



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.render('index.ejs')
})

app.get('/api/', (request, response) => {
    
    collection.find().toArray()
    .then(result => {
        console.log(result)
        response.json(result)
    })
    .catch(error => console.error(error))
})

// app.get('/api/manager', (request, response) => {
//     response.render('manager.ejs')
// })



app.get('/api/manager', (request, response) => {
    let contents = db.collection('birds').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.birdName)
            console.log(nameList)
            response.render('manager.ejs', {info: nameList})
        })
        .catch(error => console.log(error))
})


app.get('/api/:birdSearch', (request, response) => {
    const bird = request.params.birdSearch
    collection.find({birdName: bird.toLowerCase()}).toArray()
    .then(result => {
        console.log(result)
        response.json(result[0])
    })
    .catch(error => console.error(error))
})

app.post('/api', (request, respons) => {
    console.log('post heard')
    db.collection('birds').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        respons.redirect('/api/manager')
    })

})

app.put('/updateEntry', (req,res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
          delete req.body[key];
        }
      });
    console.log(req.body)
    db.collection('birds').findOneAndUpdate(
        {birdName: req.body.birdName},
        {
            $set:  req.body  
        },
        // {
        //     upsert: true
        // }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('birds').deleteOne({birdName: request.body.birdName})
    .then(result => {
        console.log(result)
        console.log('Entry Deleted')
        response.json('Entry Deleted - JSON response')

    })
    .catch(error => console.error(error))

})

//we used upload.single to tell "multer" to upload
// only single image 
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('Done');
});





app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})