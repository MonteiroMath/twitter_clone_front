import { ACTIONS } from "./actions.js";
import tweetData from "../placeholders/tweets";

export default function reducer(state = { tweets: [] }, action) {
  switch (action.type) {
    case ACTIONS.INIT:
      if (state.tweets.length === 0) {
        let tweets = tweetData;
        tweets = tweets.sort((tweet1, tweet2) => {
          return -(tweet1.created - tweet2.created);
        });

        return { ...state, tweets };
      }

      return state;

    case ACTIONS.POST_TWEET: {
      let { newTweet } = action.payload;

      let tt_count = state.tweets.length;

      let tweet = createNewTweet(tt_count + 1, newTweet);

      return { ...state, tweets: [...state.tweets, tweet] };
    }
    case ACTIONS.LIKE: {
      let { id, userId } = action.payload;

      return {
        ...state,
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              likes: tweet.likes + 1,
              liked_by: [...tweet.liked_by, userId],
            };
          }

          return tweet;
        }),
      };
    }
    case ACTIONS.UNLIKE: {
      let { id, userId } = action.payload;

      return {
        ...state,
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              likes: tweet.likes - 1,
              liked_by: tweet.liked_by.filter((id) => id !== userId),
            };
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
              retweeted_by: old_tweet.retweeted_by.filter(
                (id) => id !== userId
              ),
            };
          }

          return old_tweet;
        })
        .filter((tweet) => tweet.tweetId !== tweetId);

      return {
        ...state,
        tweets: updated_tweets,
      };
    }

    case ACTIONS.RETWEET_COM:
      return state;

    case ACTIONS.COMMENT_TWEET: {
      let { parent_id, newTweet } = action.payload;

      /*

      Create a new tweet, add the id to the parent comments property

    */

      let tt_count = state.tweets.length;

      let comment = createNewTweet(tt_count + 1, newTweet);

      let newState = {
        ...state,
        tweets: state.tweets.map((tweet) => {
          if (tweet.id === parent_id) {
            console.log("me rir");
            return {
              ...tweet,
              comments: tweet.comments + 1,
              comment_ids: [...tweet.comment_ids, comment.id],
            };
          }

          return tweet;
        }),
      };

      newState.tweets.push(comment);

      return newState;
    }

    default:
      return state;
  }
}

function createNewTweet(id, content) {
  let now = new Date().getTime();

  return {
    id,
    author: 1,
    created: now,
    message: content.message,
    attach: content.attach,
    poll: content.poll,
    retweet: content.retweet,
    retweeted_by: [],
    liked_by: [],
    pollSettings: {
      choices: content.pollSettings.choices,
      pollLen: content.pollSettings.pollLen,
      votes: [0, 0],
    },
    likes: 0,
    retweets: 0,
    comments: 0,
    comment_ids: [],
  };
}
