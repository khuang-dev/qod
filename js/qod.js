(function($){

//new quote
$('#new-quote-button').on('click', function(){
    
    $.ajax({
        method: "GET",
        url: window.qod_vars.rest_url + '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    })
    .done(function(data) {
        console.log(data[0]);  
        $('.entry-content').empty();
        $('.entry-meta').empty();
        $('.entry-content').append('<p>' + data[0].content.rendered + '</p>');

        if (data[0]._qod_quote_source === "") {
            $('.entry-meta').append('<h2>' + data[0].title.rendered + '</h2>');
        } else if (data[0]._qod_quote_source_url === "") {
            $('.entry-meta').append('<h2>' + data[0].title.rendered + '<span class="source">' + ', ' + data[0]._qod_quote_source + '</span>'+'</h2>');
        } else {
            $('.entry-meta').append('<h2>' + data[0].title.rendered + '<span class="source">' + ', <a style="font-size: 1.25rem; href="' + data[0]._qod_quote_source_url + '">' + data[0]._qod_quote_source + '</a>'+'</span>'+'</h2>')
        }
    })
    .fail(function(error){
        console.log("an error occurred", error);
});
});


//submit
$('#quote-submission-form').on('submit', function( event ) {
    event.preventDefault();

    $.ajax({
        method:"POST",
        url: window.qod_vars.rest_url + "/wp/v2/posts",
        data: {
            title: document.getElementById('quote-author').value,
            content: document.getElementById('quote-content').value,
            _qod_quote_source: document.getElementById('quote-source').value,
            _qod_quote_source_url: document.getElementById('quote-source-url').value
         },
         beforeSend: function(xhr) {
            xhr.setRequestHeader( 'X-WP-Nonce', window.qod_vars.wpapi_nonce );
         }
    })
    .done(function(data) {
        alert('Success');
        console.log(data);
    })
    .fail(function(error) {
        console.log(error);
    })
});


})(jQuery);