const mongoose = require('mongoose');

console.log(process.argv)

if(process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://pruebaslucasopenfullstack:${password}@open-full-stack.udjrs.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Open-Full-Stack`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: "Mongoose make things easy",
    important: true
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })

    mongoose.connection.close()
})