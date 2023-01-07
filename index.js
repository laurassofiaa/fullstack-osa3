const express = require('express')
const app = express()
var morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify({name: req.body.name, number: req.body.number}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())


let persons = [
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    },
    {
        name: "Arto Hellas",
        number: "111-111-1111",
        id: 4
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const names = persons.map(per => per.name)
  const exists = names.find(name => name === body.name)
  console.log(exists)

  if (!body.name || !body.number ){
    return response.status(400).json({ 
      error: 'Content missing' 
    })
  }
  if (exists != undefined){
    return response.status(400).json({ 
      error: 'Name already added' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(100),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info of ${persons.length} people</p> 
    <p>${new Date} </p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})