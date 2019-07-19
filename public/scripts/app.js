/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}


function showError1() {
  document.getElementById("errorContainer").style.display = "block";
  document.getElementById("errorMessage").style.display = "block";
  document.getElementById("errorContainer2").style.display = "none";
  document.getElementById("errorMessage2").style.display = "none";
}
function showError2() {
  document.getElementById("errorContainer").style.display = "none";
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("errorContainer2").style.display = "block";
  document.getElementById("errorMessage2").style.display = "block";
}

function hideError() {
  document.getElementById("errorContainer").style.display = "none";
  document.getElementById("errorMessage").style.display = "none";
  document.getElementById("errorContainer2").style.display = "none";
  document.getElementById("errorMessage2").style.display = "none";
}

const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass("posted");
    let $header = $('<header>').addClass("headArticle");
    let $image = $('<div>').addClass("image");
    let $id = $('<p>').addClass("ID").text(tweet.user.name);
    let $hashtag = $('<p>').addClass("hashtag").text(tweet.user.handle);
    let $textContent = $('<p>').addClass("textContent").text(tweet.content.text);
    let $line = $('<hr>').addClass("line");
    let $time = $('<time>').addClass("timeago").text(tweet.created_at);
    let $emoji2 = $('<i>').addClass("em em-black_heart");
    $header.append($image).append($id).append($hashtag).append($textContent).append($line).append($time).append($emoji2).appendTo($tweet);
    return $tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    tweets.forEach(tweet => {
        $('#container').append(createTweetElement(tweet));
    });
}

$(document).ready(() => {
  $("#container").empty();
  $("#head2").click(function(){
    $("#new-tweet").slideToggle(1300);
    hideError();
  });
  $.ajax({url: "/tweets", success: function(result){
      renderTweets(result);
  }});
  $("#form").submit(function(event){
    if ($(this).serialize() === "text=") {
      event.preventDefault();
      showError1();
    } else if ($(this).serialize().length > 145) {
      event.preventDefault();
      showError2();
    } else {
      event.preventDefault();
      hideError();
      $("#container").empty();
      $.post("/tweets",$(this).serialize(), (data)=> {
        $.ajax({url: "/tweets", success: function(result){
          renderTweets(result);
        }});
      });
      $("#textarea").val("");
    }
  });
});