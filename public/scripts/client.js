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
        <p>${passDays(tweet.created_at)}</p>
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

//Calculate the no of days the tweet was posted
const passDays = (seconds) => {
  let result = ''
  let today = Date.now();
  let days = Math.round((today - seconds) / (1000*60*60*24));
  
  if (days < 1) {
    result = `Posted few moments ago`;
  } else if (days === 1) {
    result = `Posted ${days} day ago`;
  } else {
    result = `Posted ${days} days ago`;
  }
  return result;
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
    .then(res => renderTweets(res));
}

//Handle and render error messages
const handleError = (err) => {
  
  if (err === 'maxChar') {
    $('.content .alertMessage').empty();
    $('.content .alertMessage').append('<p><span><i class="fas fa-exclamation-triangle"></i></span> &nbsp Your message is too long. Max characters should not be more than 140 characters.</p>').fadeIn(1000);
  }

  if (err === 'empty'){
    $('.content .alertMessage').empty();
    $('.content .alertMessage').append('<p><span><i class="fas fa-exclamation-triangle"></i></span> &nbsp Message can not be empty!</p>').fadeIn(1000);
  }
}

const handleSubmit = event => {
  //stop the default action of the form reload 
  event.preventDefault(); 
  
  let tweetStr = $('#tweet-text').val();
  let  serialStr= $('#tweet-text').serialize()

  if (tweetStr.length === 0) {
    handleError('empty');
  } else {
    if (tweetStr.length > 140) {
      handleError('maxChar');
    } else {
      postNewTweet(serialStr);
    }
  }
}

//New Tweet Form Toggle
const newTweetToggle = () => {
  
  if($(this).attr('click-state') === 0) {
    $(this).attr('click-state', 1);
    $('.new-tweet').slideDown(1000);
    $('#tweet-text').focus();
  } else {
  $(this).attr('click-state', 0);
  $('.new-tweet').slideUp(1000);
  }
}

//handle scroll function
const scrollPage = () => {
  if($(window).scrollTop() === 0) {
    $('footer.button-up button').fadeOut(1000);
  } else {
    $('footer.button-up button').fadeIn(1000);
  }
}

//Prevent code injection, secure input handling
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function(){
  loadTweets();
  $('form').on('submit', handleSubmit);
  $('nav .btn-new').on('click', newTweetToggle);
  $( window ).scroll(scrollPage);
  $('footer.button-up button').on('click', () => {
    $(document).scrollTop(0);
  })
})

