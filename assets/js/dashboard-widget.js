(function($) {
	'use strict';

	var rows = [];
	var yMax = 0;
	var yMin = 0;
	var listSelector = document.getElementById('mc4wp-activity-mailchimp-list');

	listSelector.onchange = getRowData;
	var previouslySelectedListValue = localStorage.getItem('mc4wp_activity_list');
	if( typeof( previouslySelectedListValue ) === "string" ) {
		listSelector.value = previouslySelectedListValue;
	}

	google.load('visualization', '1', {packages: ['corechart', 'bar']});
	google.setOnLoadCallback(getRowData);

	function getRowData() {

		// restore data
		rows = [];
		yMin = 0;
		yMax = 0;

		localStorage.setItem( 'mc4wp_activity_list', listSelector.value );

		$.getJSON( ajaxurl, {
			action: 'mc4wp_get_activity',
			mailchimp_list_id: listSelector.value
		}, function( res ) {
			rows = res.data;

			// convert strings to JavaScript Date object
			for( var i=0; i< rows.length; i++ ) {
				rows[i][0].v = new Date(rows[i][0].v);

				if(rows[i][1] > yMax ) {
					yMax = rows[i][1];
				}

				if(rows[i][2] < yMin ) {
					yMin = rows[i][2];
				}
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
				title: 'Subscriber Activity',
				viewWindow: {
					max: yMax * 1.1,
					min: yMin * 1.1
				}
			},
			explorer: {
				maxZoomOut:2,
				keepInBounds: true,
				maxZoomIn: 5
			},
			animation: {
				duration: 1000,
				easing: 'linear',
				startup: true
			},
			height: 400
		};

		var chart = new google.visualization.ColumnChart(document.getElementById("mc4wp-activity-chart"));
		chart.draw(data, options);
	}
})(window.jQuery);