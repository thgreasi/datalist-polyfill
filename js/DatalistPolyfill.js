$(document).ready(function () {
	$('input[list]').each(function () {
		var availableTags = $('#' + $(this).attr("list")).find('option').map(function () {
			return this.value;
		}).get();
		$(this).autocomplete({ source: availableTags });
	});
});
