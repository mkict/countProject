var $show = $('#show');

$('document').ready(function() {
    $.get("/increment", function(data, status) {
        $show.html("Data: " +data);
    });
});
