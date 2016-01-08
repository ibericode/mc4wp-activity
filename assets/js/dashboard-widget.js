(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// vars
var $ = window.jQuery;
var rows = [];
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

	rememberValues();

	$.getJSON( ajaxurl, {
		action: 'mc4wp_get_activity',
		mailchimp_list_id: listSelector.value,
		view: viewSelector.value
	}, function( res ) {
		rows = res.data;

		if( ! res.data || ! res.data.length ) {
			// @todo make this translatable
			chartElement.innerHTML = 'Oops. Something went wrong while fetching data from MailChimp.';
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvYnJvd3NlcmlmeS9kYXNoYm9hcmQtd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy8gdmFyc1xudmFyICQgPSB3aW5kb3cualF1ZXJ5O1xudmFyIHJvd3MgPSBbXTtcbnZhciBsaXN0U2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWM0d3AtYWN0aXZpdHktbWFpbGNoaW1wLWxpc3QnKTtcbnZhciBjaGFydEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1jNHdwLWFjdGl2aXR5LWNoYXJ0XCIpO1xudmFyIHZpZXdTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYzR3cC1hY3Rpdml0eS12aWV3Jyk7XG5cbi8vIGluaXRcbnZpZXdTZWxlY3Rvci5vbmNoYW5nZSA9IGdldFJvd0RhdGE7XG5saXN0U2VsZWN0b3Iub25jaGFuZ2UgPSBnZXRSb3dEYXRhO1xuXG5nZXRSZW1lbWJlcmVkVmFsdWVzKCk7XG5nb29nbGUubG9hZCgndmlzdWFsaXphdGlvbicsICcxJywge3BhY2thZ2VzOiBbJ2NvcmVjaGFydCcsICdiYXInLCAnbGluZSddfSk7XG5nb29nbGUuc2V0T25Mb2FkQ2FsbGJhY2soZ2V0Um93RGF0YSk7XG5cblxuLy8gZnVuY3Rpb25zXG5mdW5jdGlvbiBnZXRSZW1lbWJlcmVkVmFsdWVzKCkge1xuXHR2YXIgcHJldmlvdXNseVNlbGVjdGVkTGlzdFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21jNHdwX2FjdGl2aXR5X2xpc3QnKTtcblx0aWYoIHR5cGVvZiggcHJldmlvdXNseVNlbGVjdGVkTGlzdFZhbHVlICkgPT09IFwic3RyaW5nXCIgJiYgcHJldmlvdXNseVNlbGVjdGVkTGlzdFZhbHVlLmxlbmd0aCApIHtcblx0XHRsaXN0U2VsZWN0b3IudmFsdWUgPSBwcmV2aW91c2x5U2VsZWN0ZWRMaXN0VmFsdWU7XG5cdH1cblxuXHR2YXIgcHJldmlvdXNseVNlbGVjdGVkVmlld1ZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21jNHdwX2FjdGl2aXR5X3ZpZXcnKTtcblx0aWYoIHR5cGVvZiggcHJldmlvdXNseVNlbGVjdGVkVmlld1ZhbHVlICkgPT09IFwic3RyaW5nXCIgJiYgcHJldmlvdXNseVNlbGVjdGVkVmlld1ZhbHVlLmxlbmd0aCApIHtcblx0XHR2aWV3U2VsZWN0b3IudmFsdWUgPSBwcmV2aW91c2x5U2VsZWN0ZWRWaWV3VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtZW1iZXJWYWx1ZXMoKSB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCAnbWM0d3BfYWN0aXZpdHlfbGlzdCcsIGxpc3RTZWxlY3Rvci52YWx1ZSApO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggJ21jNHdwX2FjdGl2aXR5X3ZpZXcnLCB2aWV3U2VsZWN0b3IudmFsdWUgKTtcbn1cblxuXG5mdW5jdGlvbiBnZXRSb3dEYXRhKCkge1xuXG5cdC8vIHJlc3RvcmUgZGF0YVxuXHRyb3dzID0gW107XG5cblx0cmVtZW1iZXJWYWx1ZXMoKTtcblxuXHQkLmdldEpTT04oIGFqYXh1cmwsIHtcblx0XHRhY3Rpb246ICdtYzR3cF9nZXRfYWN0aXZpdHknLFxuXHRcdG1haWxjaGltcF9saXN0X2lkOiBsaXN0U2VsZWN0b3IudmFsdWUsXG5cdFx0dmlldzogdmlld1NlbGVjdG9yLnZhbHVlXG5cdH0sIGZ1bmN0aW9uKCByZXMgKSB7XG5cdFx0cm93cyA9IHJlcy5kYXRhO1xuXG5cdFx0aWYoICEgcmVzLmRhdGEgfHwgISByZXMuZGF0YS5sZW5ndGggKSB7XG5cdFx0XHQvLyBAdG9kbyBtYWtlIHRoaXMgdHJhbnNsYXRhYmxlXG5cdFx0XHRjaGFydEVsZW1lbnQuaW5uZXJIVE1MID0gJ09vcHMuIFNvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGZldGNoaW5nIGRhdGEgZnJvbSBNYWlsQ2hpbXAuJztcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IoIHZhciBpPTA7IGk8IHJvd3MubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHQvLyBjb252ZXJ0IHN0cmluZ3MgdG8gSmF2YVNjcmlwdCBEYXRlIG9iamVjdFxuXHRcdFx0cm93c1tpXVswXS52ID0gbmV3IERhdGUocm93c1tpXVswXS52KTtcblx0XHR9XG5cblx0XHRkcmF3Q2hhcnQoKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdDaGFydCgpIHtcblxuXHR2YXIgY2hhcnQ7XG5cdHZhciBvcHRpb25zID0ge1xuXHRcdGhBeGlzOiB7XG5cdFx0XHR0aXRsZTogJ0RhdGUnLFxuXHRcdFx0Zm9ybWF0OiAnTU1NIGQnXG5cdFx0fSxcblx0XHR2QXhpczoge30sXG5cdFx0ZXhwbG9yZXI6IHtcblx0XHRcdG1heFpvb21PdXQ6Mixcblx0XHRcdGtlZXBJbkJvdW5kczogdHJ1ZVxuXHRcdH0sXG5cdFx0YW5pbWF0aW9uOiB7XG5cdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdGVhc2luZzogJ2xpbmVhcicsXG5cdFx0XHRzdGFydHVwOiB0cnVlXG5cdFx0fSxcblx0XHRoZWlnaHQ6IDQwMFxuXHR9O1xuXG5cdGlmKCB2aWV3U2VsZWN0b3IudmFsdWUgPT09ICdzaXplJyApIHtcblx0XHRjaGFydCA9IG5ldyBTaXplQ2hhcnQoIHJvd3MsIG9wdGlvbnMgKTtcblx0fSBlbHNlIHtcblx0XHRjaGFydCA9IG5ldyBBY3Rpdml0eUNoYXJ0KCByb3dzLCBvcHRpb25zICk7XG5cdH1cblxuXHRjaGFydC5kcmF3KCk7XG59XG5cblxuXG5mdW5jdGlvbiBBY3Rpdml0eUNoYXJ0KCByb3dzLCBvcHRpb25zICkge1xuXG5cdHZhciBkYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuXHRkYXRhLmFkZENvbHVtbignZGF0ZScsICdEYXRlJyk7XG5cdGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAnTmV3IFN1YnNjcmliZXJzJyk7XG5cdGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAnVW5zdWJzY3JpYmVzJyk7XG5cdGRhdGEuYWRkUm93cyhyb3dzKTtcblxuXHRvcHRpb25zLmlzU3RhY2tlZCA9IHRydWU7XG5cdG9wdGlvbnMudGl0bGUgPSAnQWN0aXZpdHkgZm9yIGxpc3QgJyArIGxpc3RTZWxlY3Rvci5vcHRpb25zW2xpc3RTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XG5cdG9wdGlvbnMudkF4aXMudGl0bGUgPSBcIlN1YnNjcmliZXIgQWN0aXZpdHlcIjtcblxuXHRmdW5jdGlvbiBkcmF3KCkge1xuXHRcdHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db2x1bW5DaGFydChjaGFydEVsZW1lbnQpO1xuXHRcdGNoYXJ0LmRyYXcoZGF0YSwgb3B0aW9ucyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGRyYXc6IGRyYXdcblx0fVxuXG59XG5cbmZ1bmN0aW9uIFNpemVDaGFydCggcm93cywgb3B0aW9ucyApIHtcblxuXHR2YXIgZGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcblx0ZGF0YS5hZGRDb2x1bW4oJ2RhdGUnLCAnRGF0ZScpO1xuXHRkYXRhLmFkZENvbHVtbignbnVtYmVyJywgJ1N1YnNjcmliZXJzJyk7XG5cdGRhdGEuYWRkUm93cyhyb3dzKTtcblxuXHRvcHRpb25zLnRpdGxlID0gXCJMaXN0IHNpemUgZm9yIGxpc3QgXCIgKyBsaXN0U2VsZWN0b3Iub3B0aW9uc1tsaXN0U2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJIVE1MO1xuXHRvcHRpb25zLnZBeGlzLnRpdGxlID0gXCJOdW1iZXIgb2YgU3Vic2NyaWJlcnNcIjtcblx0b3B0aW9ucy5sZWdlbmQgPSB7IHBvc2l0aW9uOiAnbm9uZScgfTtcblxuXHRmdW5jdGlvbiBkcmF3KCkge1xuXHRcdHZhciBjaGFydCA9IG5ldyBnb29nbGUuY2hhcnRzLkxpbmUoY2hhcnRFbGVtZW50KTtcblx0XHRjaGFydC5kcmF3KGRhdGEsIG9wdGlvbnMpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRkcmF3OiBkcmF3XG5cdH1cbn0iXX0=
