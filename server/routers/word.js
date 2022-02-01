const express = require('express');
const wordRouter = express.Router();
const { partOfSpeech, findWord, findWordAndPos } = require('../Controller/wordAndPos');

wordRouter.get('/part-of-speech/:part', partOfSpeech);
wordRouter.get('/:word', findWord);
wordRouter.get('/:word/:partOfSpeech', findWordAndPos);

module.exports.wordRouter = wordRouter;
