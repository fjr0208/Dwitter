import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    // const data = username
    //   ? tweets.filter((tweet) => tweet.username === username)
    //   : tweets;
    if (username) {
        const data = await tweetRepository.getAllByUsername(username);
        res.status(200).json(data);

    } else if (!username) {
        const data = await tweetRepository.getAll();
        res.status(200).json(data);
    }

}

export async function getTweetById(req, res) {
    const id = req.params.id;
    const data = await tweetRepository.getById(id);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function createTweet(req, res) {
    const { text, name, username } = req.body;
    const tweets = await tweetRepository.create(text, name, username);
    res.status(201).json(tweets);
}

export async function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function deleteTweet(req, res) {
    const id = req.params.id;
    await tweetRepository.deleteTweet(id);
    res.sendStatus(204);
}