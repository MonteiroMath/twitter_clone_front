/*

Retweet modeling

id: 
author:
created:
tweet: {}

*/

const retweets = [
  {
    id: 101,
    author: 1,
    created: new Date().getTime(),
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
