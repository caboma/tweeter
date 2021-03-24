//Render tweet components to be appended
const createTweetElement = function (tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${tweet.user.avatars}">
        <h3>${tweet.user.name}</h3>
        <p>${tweet.user.handle}</p>
      </header>
      <p>${escape(tweet.content.text)}</p>
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

//Loop through the tweets and append to allTweet section
const renderTweets = function(tweets) {
    
  for (let tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $(".allTweets").prepend($tweet);
  }
}

//Submit new tweet to the server using ajax
const postNewTweet = (tweetStr) => {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: tweetStr
  })
  .then(res => {
    $('.allTweets').empty();
    loadTweets();
    $("#tweet-text").val("");
  })
}

//fetch all tweets in the server and call renderTweet function to append
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then(res => renderTweets(res))
}
const handleError = (err) => {
  if (err === 'maxChar') {
    $('.alertMessage').fadeIn(1000);
  }
}

const handleSubmit = event => {
  //stop the default action of the form reload 
  event.preventDefault(); 
  
  let tweetStr = $('#tweet-text').val();
  let  serialStr= $('#tweet-text').serialize()

  if (tweetStr.length === 0) {
    alert('Tweet message should not be empty');
  } else {
    if (tweetStr.length > 140) {
      handleError('maxChar');
    } else {
      postNewTweet(serialStr);
    }
  }
}

//Prevent code injection, secure input handling
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Perform js or jquery once document is ready
$(document).ready(function(){
  loadTweets();
  $('form').on('submit', handleSubmit)
})