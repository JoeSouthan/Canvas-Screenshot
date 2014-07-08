$(document).ready(function() {

  function exportCanvas() {
    html2canvas($('#wrapper'), {
      onrendered: function(canvas) {
        $('#output').html(canvas)
        var request = $.ajax({
          url: 'http://localhost:4567/export',
          type: 'POST',
          data: {file_data: document.getElementsByTagName('canvas')[0].toDataURL('img/png')},
        })
        .done(function(data) {
          $('#status').html(data['ok'])
        });
      }
    }); 
  }

  function convertImages(callback) {
    var requests = []
    $('img').each(function(index, el) {
      var img = $(this)
      requests.push($.ajax({
        url: 'http://localhost:4567/convert',
        type: 'GET',
        data: {image_url: img.attr('src')},
      })
      .done(function(data) {
        img.attr('src', 'data:image/png;base64,'+data).data('converted', 'true');
      }));
    });
    $.when.apply($, requests).done(function() {
      exportCanvas();
    });
  }

  $('#submit').on('click', function(event) {
    event.preventDefault();
    convertImages();
  });
});