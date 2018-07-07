const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://user:user123@ds229701.mlab.com:29701/bookslist', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {books: result})
  })
})

app.get('/react', (req, res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.json(result)
  })
})

app.post('/booktitles', (req, res) => {
  db.collection('books').save({title: req.body.title, aurthor:req.body.aurthor, thumbUp: 0, thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/thumbUp', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({title: req.body.title, aurthor:req.body.aurthor}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/thumbDown', (req, res) => {
  db.collection('books')
  .findOneAndUpdate({title: req.body.title, aurthor:req.body.aurthor}, {
    $set: {
      thumbUp:req.body.thumbUp - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  },
  (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/booktitles', (req, res) => {
  db.collection('books').findOneAndDelete({title: req.body.title,  aurthor:req.body.aurthor}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
