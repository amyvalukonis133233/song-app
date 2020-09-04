const express = require('express')
const {validationResult} = require('express-validator')
const songValidator = require('../validators/song')
const {createSong, deleteSong, updateSong, getSong} = require('../db/dbHelper')

const router = new express.Router  

router.post('/songs', songValidator, async (req, res) => {
    const errors = validationResult(req) 

    if(!(errors.isEmpty())) {
        return res.status(400).send(errors)
    }
    
    try {
        const songObject = req.body 
        const song = await createSong(songObject)
        res.status(200).send(song)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/songs/:id', async (req, res) => {
    try {
        const id = req.params.id 
        await deleteSong(id)
        res.status(204).send()
    }

    catch (error) {
        res.status(500).send(error)
    }
})

router.put('/songs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const songObject = req.body 
        await updateSong(songObject, id)
        res.status(200).send()
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//returns a placeholder representing the binary data of a particular song that can be played
router.get('/songs/:id', async (req, res) => {
    try {
        const songId = req.params.id
        const song = await getSong(songId)
        res.status(200).send(song)
    }
    catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router 