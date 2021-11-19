import { ACTIONS } from "./actions.js";
import tweetData from "../placeholders/tweets";
import retweetData from "../placeholders/retweets";

export default function reducer(state = { tweets: [] }, action) {
  switch (action.type) {
    case ACTIONS.INIT:
      let tweets = tweetData.concat(retweetData);
      tweets = tweets.sort((tweet1, tweet2) => {
        return -(tweet1.created - tweet2.created);
      });

      return { ...state, tweets };
    case ACTIONS.POST_TWEET: {
      let now = new Date().getTime();
      let { newTweet } = action.payload;

      let tweet = {
        id: 5,
        author: 1,
        created: now,
        message: newTweet.message,
        attach: newTweet.attach,
        poll: newTweet.poll,
        pollSettings: {
          choices: newTweet.pollSettings.choices,
          pollLen: newTweet.pollSettings.pollLen,
          votes: [0, 0],
        },
        likes: 0,
        retweets: 0,
        comments: 0,
      };

      return { ...state, tweets: [...state.tweets, tweet] };
    }
    case ACTIONS.LIKE: {
      let { id } = action.payload;

      return {
        ...state,
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === id) {
            return { ...tweet, likes: tweet.likes + 1 };
          }

          return tweet;
        }),
      };
    }
    case ACTIONS.UNLIKE: {
      let { id } = action.payload;

      return {
        ...state,
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === id) {
            return { ...tweet, likes: tweet.likes - 1 };
          }

          return tweet;
        }),
      };
    }

    case ACTIONS.RETWEET: {
      let { tweetId, userId } = action.payload;

      let updated_tweets = state.tweets.map((old_tweet) => {
        if (old_tweet.id === tweetId) {
          return {
            ...old_tweet,
            retweets: old_tweet.retweets + 1,
            retweeted_by: [...old_tweet.retweeted_by, userId],
          };
        }

        return old_tweet;
      });

      let retweet = {
        id: 1001,
        author: 1,
        created: new Date().getTime(),
        tweetId,
      };

      return {
        ...state,
        tweets: [...updated_tweets, retweet],
      };
    }

    case ACTIONS.UNDO_RETWEET: {
      let { tweetId, userId } = action.payload;

      let updated_tweets = state.tweets
        .map((old_tweet) => {
          if (old_tweet.id === tweetId) {
            return {
              ...old_tweet,
              retweets: old_tweet.retweets - 1,
              retweeted_by: old_tweet.retweeted_by.filter((id) => id !== userId),
            };
          }

          return old_tweet;
        })
        .filter((tweet) => tweet.tweetId !== tweetId);

      console.log(updated_tweets);
      return {
        ...state,
        tweets: updated_tweets,
      };
    }

    case ACTIONS.RETWEET_COM:
      return state;

    default:
      return state;
  }
}
