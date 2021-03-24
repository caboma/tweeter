/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  //Loop through the tweets and append to inner-container
  const renderTweets = function(tweets) {
    
    for (let tweet in tweets) {
      $tweet = createTweetElement(tweets[tweet]);
      $(".inner-container").append($tweet);
    }
  }
  //Render tweet components to be appended
  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}">
        <h3>${tweet.user.name}</h3>
        <p>${tweet.user.handle}</p>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <p>${tweet.created_at}</p>
        <p>
          <i class="btn fas fa-flag"></i>
          <i class="btn fas fa-retweet"></i>
          <i class="btn fas fa-heart"></i>
        </p>
      </footer>
    </article>
  `;
  return $tweet;
  }
  renderTweets(data);


  const postNewTweet = (tweetStr) => {
    
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweetStr
    })
      .then(res => console.log('sent to tweet', res))
      .catch(err => console.log(err))
  }
  //stop the default action of the form by reload 
  const handleSubmit = event => {
    event.preventDefault(); 
    let tweetStr = $("form").serialize()
    postNewTweet(tweetStr)
  }

  $('form').on('submit', handleSubmit)
  
  
})


