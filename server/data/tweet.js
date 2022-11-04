let tweets = [
    {
        id: '1',
        text: '드림코더분들 화이팅!',
        createdAt: Date.now().toString(),
        name: 'name1',
        username: 'username1',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        text: '안뇽!',
        createdAt: Date.now().toString(),
        name: 'name2 ',
        username: 'username2',
    },
];

export function getAll() {
    return tweets;
}

export function getAllByUsername(username) {
    return tweets.filter((t) => t.username === username);
}

export function getById(id) {
    return tweets.find((t) => t.id === id);
}

export function create(text, username, name) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets.push(tweet);

    return tweets;
}

export function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
        return tweet;
    } else {
        return null;
    }

}

export function deleteTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}