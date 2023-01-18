const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
//var morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())

app.use(cors())

app.use(express.static('build'))

//morgan.token('body', (req, res) => JSON.stringify({name: req.body.name, number: req.body.number}))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//     {
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//         id: 1
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234345",
//         id: 2
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 3
//     },
//     {
//         name: "Arto Hellas",
//         number: "111-111-1111",
//         id: 4
//     }
// ]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) { 
    return response.status(400).json({ error: 'content missing' })
  }

  // if (!body.name || !body.number ){
  //   return response.status(400).json({ 
  //     error: 'Content missing' 
  //   })
  // }

  //const exists = Person.find(body.name)
  //const names = persons.map(per => per.name)
  //const exists = names.find(name => name === body.name)
  //console.log(exists)

  // if (exists != undefined){
  //   return response.status(400).json({ 
  //     error: 'Name already added' 
  //   })
  // } 

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  //persons = persons.concat(person)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// app.get('/api/persons', (req, res) => {
//   res.json(persons)
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
}) 

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info of ${persons.length} people</p> 
    <p>${new Date} </p>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})