import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../validation/validator.js';

const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({ min: 2, max: 30 })
        .withMessage('3글자이상 30글자 이하로 입력해주세요'),
    validate];



// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweetById);

// POST /tweeets
router.post('/', validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
