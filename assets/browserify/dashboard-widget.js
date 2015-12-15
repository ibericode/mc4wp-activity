'use strict';

// vars
var $ = window.jQuery;
var rows = [];
var yMax = 0;
var yMin = 0;
var listSelector = document.getElementById('mc4wp-activity-mailchimp-list');
var chartElement = document.getElementById("mc4wp-activity-chart");
var viewSelector = document.getElementById('mc4wp-activity-view');

// init
viewSelector.onchange = getRowData;
listSelector.onchange = getRowData;

getRememberedValues();
google.load('visualization', '1', {packages: ['corechart', 'bar', 'line']});
google.setOnLoadCallback(getRowData);


// functions
function getRememberedValues() {
	var previouslySelectedListValue = localStorage.getItem('mc4wp_activity_list');
	if( typeof( previouslySelectedListValue ) === "string" && previouslySelectedListValue.length ) {
		listSelector.value = previouslySelectedListValue;
	}

	var previouslySelectedViewValue = localStorage.getItem('mc4wp_activity_view');
	if( typeof( previouslySelectedViewValue ) === "string" && previouslySelectedViewValue.length ) {
		viewSelector.value = previouslySelectedViewValue;
	}
}

function rememberValues() {
	localStorage.setItem( 'mc4wp_activity_list', listSelector.value );
	localStorage.setItem( 'mc4wp_activity_view', viewSelector.value );
}


function getRowData() {

	// restore data
	rows = [];
	yMin = 0;
	yMax = 0;

	rememberValues();

	$.getJSON( ajaxurl, {
		action: 'mc4wp_get_activity',
		mailchimp_list_id: listSelector.value,
		view: viewSelector.value
	}, function( res ) {
		rows = res.data;

		if( ! res.data || ! res.data.length ) {
			chartElement.innerHTML = 'Oops. Something went wrong while fetching data from MailChimp.';
			return;
		}

		for( var i=0; i< rows.length; i++ ) {
			// convert strings to JavaScript Date object
			rows[i][0].v = new Date(rows[i][0].v);

			// calculate maximum Y value.
			if(rows[i][1] > yMax ) {
				yMax = rows[i][1];
			}

			if( viewSelector.value === 'activity' ) {
				// calculate minimum Y value
				if(rows[i][2] < yMin ) {
					yMin = rows[i][2];
				}
			}
		}

		drawChart();
	});
}

function drawChart() {

	var chart;
	var options = {
		hAxis: {
			title: 'Date',
			format: 'MMM d'
		},
		vAxis: {
			viewWindow: {
				max: yMax * 1.2,
				min: 0
			}
		},
		explorer: {
			maxZoomOut:2,
			keepInBounds: true
		},
		animation: {
			duration: 1000,
			easing: 'linear',
			startup: true
		},
		height: 400
	};

	if( viewSelector.value === 'size' ) {
		chart = new SizeChart( rows, options );
	} else {
		chart = new ActivityChart( rows, options );
	}

	chart.draw();
}



function ActivityChart( rows, options ) {

	var data = new google.visualization.DataTable();
	data.addColumn('date', 'Date');
	data.addColumn('number', 'New Subscribers');
	data.addColumn('number', 'Unsubscribes');
	data.addRows(rows);

	options.isStacked = true;
	options.title = 'Activity for list ' + listSelector.options[listSelector.selectedIndex].innerHTML;
	options.vAxis.title = "Subscriber Activity";
	options.vAxis.viewWindow.min = yMin * 1.2;

	function draw() {
		var chart = new google.visualization.ColumnChart(chartElement);
		chart.draw(data, options);
	}

	return {
		draw: draw
	}

}

function SizeChart( rows, options ) {

	var data = new google.visualization.DataTable();
	data.addColumn('date', 'Date');
	data.addColumn('number', 'Subscribers');
	data.addRows(rows);

	options.title = "List size for list " + listSelector.options[listSelector.selectedIndex].innerHTML;
	options.vAxis.title = "Number of Subscribers";
	options.vAxis.viewWindow.min = 0;
	options.legend = { position: 'none' };

	function draw() {
		var chart = new google.charts.Line(chartElement);
		chart.draw(data, options);
	}

	return {
		draw: draw
	}
}