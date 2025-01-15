const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({}).then(result => {
        response.json(result)
    })
})

notesRouter.get('/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        if(note) {
            response.json(note)
        }else{
            response.status(404).end()
        }
    })
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save()
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).json(result)
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, {new:true})
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter