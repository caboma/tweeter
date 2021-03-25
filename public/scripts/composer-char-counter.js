$(document).ready(function() {
  // Counting the textarea length in new-tweet section
  $('.new-tweet #tweet-text').keyup(function () {
    let count = 140 - $(this).val().length;
    //Update the counter diplay in output element with counter class
    $('.footer .counter').html(count)
    if(count < 0) {
      $('.footer .counter').css('color', 'red')
    }
    if(count >= 0) {
      $('.alertMessage').fadeOut(1000)
    }
    
  })
});