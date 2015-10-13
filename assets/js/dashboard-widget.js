(function($) {
	'use strict';

	var rows = [];
	var listSelector = document.getElementById('mc4wp-activity-mailchimp-list');

	listSelector.onchange = getRowData;

	google.load('visualization', '1', {packages: ['corechart', 'bar']});
	google.setOnLoadCallback(getRowData);

	function getRowData() {
		$.getJSON( ajaxurl, {
			action: 'mc4wp_get_activity',
			mailchimp_list_id: listSelector.value
		}, function( res ) {
			rows = res.data;

			// convert strings to JavaScript Date object
			for( var i=0; i< rows.length; i++ ) {
				rows[i][0].v = new Date(rows[i][0].v);
			}

			drawChart();
		});
	}

	function drawChart() {
		var data = new google.visualization.DataTable();
		data.addColumn('date', 'Date');
		data.addColumn('number', 'New Subscribers');
		data.addColumn('number', 'Unsubscribes');

		data.addRows(rows);

		var options = {
			title: 'Activity for list ' + listSelector.options[listSelector.selectedIndex].innerHTML,
			isStacked: true,
			hAxis: {
				title: 'Date',
				format: 'MMM d'
			},
			vAxis: {
				title: 'Subscriber Activity'
			},
			height: 350
		};

		var chart = new google.visualization.ColumnChart(document.getElementById("mc4wp-activity-chart"));
		chart.draw(data, options);
	}
})(window.jQuery);