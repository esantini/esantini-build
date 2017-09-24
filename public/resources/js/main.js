
var headerHeight;

function repositionHeader(){
	if ($(window).scrollTop() > headerHeight + 7) {
        $('#scroller').css('top', $(window).scrollTop() - headerHeight - 7);
    } else {
    	$('#scroller').css('top', 0);
    }
};

$(window).load(function(){
	if($('#header').length){
		setHeaderHeight();
	} else {
		headerHeight = 0;
	}
	repositionHeader();
	$('#headerImg').css('max-width', $(window).width() - 10);
});

$(window).scroll(function () {
    repositionHeader();
});

$(window).resize(function () {
	if($('#header').length){
		setHeaderHeight();
	} else {
		headerHeight = 0;
	}
	repositionHeader();
	$('#headerImg').css('max-width', $(window).width() - 10);
});

function setHeaderHeight(){
	headerHeight = $('#header').height() - 1;
};