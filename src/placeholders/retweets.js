/*

Retweet modeling

id: 
author:
created:
message:
tweet: {}

*/

const retweets = [
  {
    id: 100,
    author: 1,
    created: new Date().getTime(),
    message: "This is my opinion on this matter",
    tweet: {
      id: 0,
      author: 1,
      created: new Date().getTime(),
      message: "This is my first tweet, hi everyone",
      likes: 3,
      retweets: 0,
      comments: 0,
      attach: "/images/phattach.jpeg",
      poll: false,
      pollSettings: {},
    },
  },
  {
    id: 101,
    author: 1,
    created: new Date().getTime(),
    message: "",
    tweet: {
      id: 1,
      author: 1,
      created: new Date().getTime(),
      message: "This is my second tweet lol getting good at this",
      likes: 3,
      retweets: 0,
      comments: 0,
      attach: "",
      poll: false,
      pollSettings: {},
    },
  },
];

export default retweets;
