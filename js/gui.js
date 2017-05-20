var server = "http://localhost:8080";

$( document ).ready(function(){
  getSubReddit("popular", "");
  initActionListeners();
});

function initActionListeners() {}


function getSubReddit(subName, pageName) {
  makeRequest("/r/" + subName + "/" + pageName);
}

function renderSubReddit(data){
  var templateStr = $("#post-template").html();
  var container = $("#sheet");
  //$("#subredditName")

  data.data.children.forEach(function(item, index){
    var html = Mustache.to_html(templateStr, item.data);
    container.append(html);
  });
}

ction makeRequest(url) {
  var address = server + url;

  $.ajax({
    url: address,
    async: true,
    dataType: "jsonp", //Use JSONP, the browser will block the cross-domain request otherwise
    success: function success(data) {
      renderSubReddit(data);
    },
    error: function error(_error) {
      console.log(_error.statusCode());
      return { error: "oh-shit" };
    }
  });
}