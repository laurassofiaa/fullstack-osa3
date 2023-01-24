const mongoose = require('mongoose')
mongoose.set('strictQuery', true) // estää mongoosee herjaamasta jostai turhasta konsolissa

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
//console.log(`name: ${name}`)
const number = process.argv[4]
//console.log(`number: ${number}`)

const url =
`mongodb+srv://fullstackLaura:${password}@cluster0.qvtrmnx.mongodb.net/PhonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', PersonSchema)

if (name === undefined && number === undefined){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
