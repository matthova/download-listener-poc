// Hardcoded url to file
var url = "http://lf.fusion360.io/api/limbforge?parameters=%7B%22component%22%3A1%2C%22orientation%22%3A%22left%22%2C%22C4%22%3A250%2C%22L1%22%3A250%2C%22TD%22%3A%22phone%22%7D";

function fetchUrl() {
  fetch(url, {method: 'get'})
  .then(res => res.blob())
  .then((blob) => {
    console.log('All done, Fetch');
    saveAs(blob, "filename.zip")
  });
}

function vanillaJs() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = "blob";
  xhr.onreadystatechange = function (){
    if (xhr.readyState === 4) {
      var blob = xhr.response;
      console.log('All done, VanillaJS');
      saveAs(blob, "filename.zip");
    }
  };
  xhr.send();
}

function ajaxDownload() {
  $.ajax({
    type: "GET",
    url: url,
    cache: false,
    // contentType: "jsonp",
    crossDomain: true,
    success: (data) => {
      var byteArray = (data);
      var blob = new Blob([byteArray], { type: "application/octet-stream" });
      console.log('All done, AJAX');
      saveAs(blob, "filename.zip");
    }
  });
}

$(document).on('ready', function() {
  $("#our-button").click(fetchUrl);
  $("#our-button").click(vanillaJs);
  $("#our-button").click(ajaxDownload);
});
