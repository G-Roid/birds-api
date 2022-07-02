const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000



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

app.get('/api/manager', (request, response) => {
    response.render('manager.ejs')
})

app.get('/api/:birdSearch', (request, response) => {
    const bird = request.params.birdSearch
    collection.find({birdName: bird}).toArray()
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





app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})