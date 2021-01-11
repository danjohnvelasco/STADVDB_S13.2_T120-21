$(document).ready(() => {
  // Add click event handler
  $('#btn1').click(function(event) {
    event.preventDefault(); // prevent refresh
    readHandler();
  });
});

function readHandler() {
  $.ajax({
    url: '/api/read',
    method: 'GET',
    //data: {user: userId},
    success: (data, status) => {
      // append images to gallery    
      data.forEach((item, index) => {
        addToGallery(item, gallery);
      });
      // set fancybox instance options
      $('[data-fancybox]').fancybox({
        toolbar: true,
        smallBtn: false,
        buttons: ["close"],
        infobar: false,
        iframe: {
          preload: false
        },
        arrows: false,
        touch: false
      })
    },
    error: () => {
      console.log('error gallery.js');
    }
  });
}
// Helper functions

/*
//this function adds an image to the gallery
function addToGallery(item, parentDiv) {
  // DOM Creation
  var linkDiv = document.createElement('div');
  var link = document.createElement('a');
  var img = document.createElement('img');
  // adding attributes
  $(img).attr('src', `/post/image/${item.img}`);
  $(link).attr('data-fancybox', '');    
  $(link).attr('data-type', 'ajax');
  $(link).attr('data-src', `/post/${item._id}`);
  $(link).attr('href', 'javascript:;');
  // appending
  $(link).append(img);
  $(linkDiv).append(link);
  $(parentDiv).append(linkDiv);
}
*/