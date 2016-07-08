var $show = $('#show');

$('document').ready(function() {
    $.get('/visit', function(data, status) {
        $show.html("Data: " + data);
        console.log(data);
    });
});
