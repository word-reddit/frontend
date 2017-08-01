var server = "http://localhost:8080";
var currentSub = "popular";
var currentSubPage = "";

var subredditTempStr;
var postTempStr;
var container;

$( document ).ready(function(){
  subredditTempStr = $("#post-template").html();
  postTempStr = $("#single-post-template").html();
  container = $("#sheet-content");

  getSubReddit(currentSub, currentSubPage);
});

function initActionListeners() {
  $("html").find("*").off();

  $(".post-title").click(function(event){
    getPost($(event.target).attr('permalink'));
  });

  $(".subName").click(function(event){
    console.log('click on subreddit Name: ');
    getSubReddit($(event.target).attr('subreddit'), '');
  });

  $(".subredditPage").click(function(event){
    getSubReddit(currentSub, $(event.target).attr('page'));
    console.log($(event.target).attr('page'));
  });

}


function getSubReddit(subName, pageName) {
  currentSub = subName;
  currentSubPage = pageName;
  makeRequest("/r/" + subName + "/" + pageName, "subreddit");
}


function getPost(permalink){
  currentSub = permalink.split("/")[2];
  currentSubPage = "";
  makeRequest(permalink, "post");
}



function renderSubReddit(data){
  container.html("");
  $("#subredditName").html(currentSub);
  $("#pageName").html(currentSubPage);

  data.data.children.forEach(function(item, index){
    var html = Mustache.to_html(subredditTempStr, item.data);
    container.append(html);
  });

  initActionListeners();
}

function renderPost(data){
  container.html("");
  $("#subredditName").html(currentSub);
  $("#pageName").html(currentSubPage);

  initActionListeners();
}

function makeRequest(url, dataType) {
  var address = server + url;

  console.log("Requested:" + address);

  $.ajax({
    url: address,
    async: true,
    dataType: "jsonp", //Use JSONP, the browser will block the cross-domain request otherwise
    success: function(data) {
      console.log("Response: " + data)

      switch(dataType){
        case("subreddit"):
          renderSubReddit(data);
          break;
        case("post"):
          renderPost(data);
          break;
        default:
          console.log("invalid dataType in makeRequest()");
          break;    
      }
    },
    error: function(_error) {
      console.log(_error.statusCode());
      return { error: "itz dat error" };
    }
  });
}



