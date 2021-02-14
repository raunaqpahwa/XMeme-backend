const express = require('express');
const router = express.Router();
const Meme = require('../models/memes');

router.get('/:id', async (request, response, next) => {
    const {id} = request.params;
    if (!id) {
        next();
    }
    try {
        const meme = await Meme.findById(id);
        if (meme == null) {
            response.status(404).send({message: 'The meme with the given ID wasn\'t found'});
        }
        response.send(meme);
    } catch (error) {
        response.status(404).send({message: 'The meme with the given ID wasn\'t found'});
    }
});

router.get('/', async (request, response) => {
    try {
        const latestMemes = await Meme.find({}, 
            {createdAt: 0, updatedAt: 0, __v: 0}, 
            {sort: {'updatedAt': -1}})
            .limit(100);
        response.send(latestMemes);
    } catch (error) {
        response.status(500).send({message: 'Error finding the latest memes'});
    }
});

router.post('/', async (request, response) => {
    const {name, url, caption} = request.body
    const newMeme = new Meme({ name, caption, url });
    try {
        const existingMeme = await Meme.findOne({name: name, caption: caption, url: url});
        if (existingMeme != null) {
            response.status(409).send({message: 'Duplicate meme exists, Please try again'});
        }
        const newMemeInserted = await newMeme.save();
        response.status(201).send({id: newMemeInserted.id})
    } catch (error) {
        response.status(400).send({message: 'Invalid request, Please check name, caption, url and try again'});
    }
});

router.patch('/:id', async (request, response) => {
    const {id} = request.params;
    const {name, url, caption} = request.body;
    try {
        const currentMeme = await Meme.findById(id);
        if (url != null) {
            currentMeme.url = url;
        }
        if (caption != null) {
            currentMeme.caption = caption;
        }
        currentMeme.save();
        return response.end();
    } catch (error) {
        return response.status(404).send({message: 'The meme with the following ID wasn\'t found. Please try again.'});
    }
});

module.exports = router;