(function () { var require = undefined; var define = undefined; (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// vars
var $ = window.jQuery;
var rows = [];
var listSelector = document.getElementById('mc4wp-activity-mailchimp-list');
var chartElement = document.getElementById("mc4wp-activity-chart");
var viewSelector = document.getElementById('mc4wp-activity-view');
var periodSelector = document.getElementById('mc4wp-activity-period');

// init
viewSelector.onchange = getRowData;
listSelector.onchange = getRowData;
periodSelector.onchange = getRowData;

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

	var previouslySelectedPeriodValue = localStorage.getItem('mc4wp_activity_period');
	if( previouslySelectedPeriodValue && previouslySelectedPeriodValue.length ) {
		periodSelector.value = previouslySelectedPeriodValue;
	}
}

function rememberValues() {
	localStorage.setItem( 'mc4wp_activity_list', listSelector.value );
	localStorage.setItem( 'mc4wp_activity_view', viewSelector.value );
	localStorage.setItem( 'mc4wp_activity_period', periodSelector.value );
}


function getRowData() {

	// restore data
	rows = [];

	rememberValues();

	$.getJSON( ajaxurl, {
		action: 'mc4wp_get_activity',
		mailchimp_list_id: listSelector.value,
		period: periodSelector.value,
		view: viewSelector.value
	}, function( res ) {
		rows = res.data;

		if( ! res.data || ! res.data.length ) {
			// @todo make this translatable
			chartElement.innerHTML = 'Oops. Something went wrong while fetching data from Mailchimp.';
			return;
		}

		for( var i=0; i< rows.length; i++ ) {
			// convert strings to JavaScript Date object
			rows[i][0].v = new Date(rows[i][0].v);
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
		vAxis: {},
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
	options.legend = { position: 'none' };

	function draw() {
		var chart = new google.charts.Line(chartElement);
		chart.draw(data, options);
	}

	return {
		draw: draw
	}
}
},{}]},{},[1]);
 })();