var image_onclick = function (event) {
    window.alert('Hello World !');
};

var document_onready = function (event) {
    $('#myButton').on('click', image_onclick);
};

$(document).ready(document_onready);