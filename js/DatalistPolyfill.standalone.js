$(document).ready(function () {
	var nativedatalist = false;
	// check if modernizr is available or use the handmade way
	if (typeof Modernizr 			!= 'undefined' &&
		typeof Modernizr.input 		!= 'undefined' &&
		typeof Modernizr.input.list != 'undefined') {
		nativedatalist = Modernizr.input.list;
	} else {
		nativedatalist = !!('list' in document.createElement('input')) && 
						 !!(document.createElement('datalist') && window.HTMLDataListElement);
	}
	
    if (!nativedatalist) {
        $('input[list]').each(function () {
            var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
                return this.value;
            }).get();
            $(this).autocomplete({ source: availableTags });
        });
    }
});
