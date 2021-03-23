$(document).ready(function() {
  // --- our code goes here ---
  
  $('.new-tweet #tweet-text').keyup(function () {
    let count = 140 - $(this).val().length;
    $('.footer .counter').html(count)
    if(count < 0) {
      $('.footer .counter').css('color', 'red')
    }
  })
});