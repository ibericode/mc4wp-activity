(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvYnJvd3NlcmlmeS9kYXNoYm9hcmQtd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyB2YXJzXG52YXIgJCA9IHdpbmRvdy5qUXVlcnk7XG52YXIgcm93cyA9IFtdO1xudmFyIHlNYXggPSAwO1xudmFyIHlNaW4gPSAwO1xudmFyIGxpc3RTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYzR3cC1hY3Rpdml0eS1tYWlsY2hpbXAtbGlzdCcpO1xudmFyIGNoYXJ0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWM0d3AtYWN0aXZpdHktY2hhcnRcIik7XG52YXIgdmlld1NlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21jNHdwLWFjdGl2aXR5LXZpZXcnKTtcblxuLy8gaW5pdFxudmlld1NlbGVjdG9yLm9uY2hhbmdlID0gZ2V0Um93RGF0YTtcbmxpc3RTZWxlY3Rvci5vbmNoYW5nZSA9IGdldFJvd0RhdGE7XG5cbmdldFJlbWVtYmVyZWRWYWx1ZXMoKTtcbmdvb2dsZS5sb2FkKCd2aXN1YWxpemF0aW9uJywgJzEnLCB7cGFja2FnZXM6IFsnY29yZWNoYXJ0JywgJ2JhcicsICdsaW5lJ119KTtcbmdvb2dsZS5zZXRPbkxvYWRDYWxsYmFjayhnZXRSb3dEYXRhKTtcblxuXG4vLyBmdW5jdGlvbnNcbmZ1bmN0aW9uIGdldFJlbWVtYmVyZWRWYWx1ZXMoKSB7XG5cdHZhciBwcmV2aW91c2x5U2VsZWN0ZWRMaXN0VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWM0d3BfYWN0aXZpdHlfbGlzdCcpO1xuXHRpZiggdHlwZW9mKCBwcmV2aW91c2x5U2VsZWN0ZWRMaXN0VmFsdWUgKSA9PT0gXCJzdHJpbmdcIiAmJiBwcmV2aW91c2x5U2VsZWN0ZWRMaXN0VmFsdWUubGVuZ3RoICkge1xuXHRcdGxpc3RTZWxlY3Rvci52YWx1ZSA9IHByZXZpb3VzbHlTZWxlY3RlZExpc3RWYWx1ZTtcblx0fVxuXG5cdHZhciBwcmV2aW91c2x5U2VsZWN0ZWRWaWV3VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWM0d3BfYWN0aXZpdHlfdmlldycpO1xuXHRpZiggdHlwZW9mKCBwcmV2aW91c2x5U2VsZWN0ZWRWaWV3VmFsdWUgKSA9PT0gXCJzdHJpbmdcIiAmJiBwcmV2aW91c2x5U2VsZWN0ZWRWaWV3VmFsdWUubGVuZ3RoICkge1xuXHRcdHZpZXdTZWxlY3Rvci52YWx1ZSA9IHByZXZpb3VzbHlTZWxlY3RlZFZpZXdWYWx1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1lbWJlclZhbHVlcygpIHtcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oICdtYzR3cF9hY3Rpdml0eV9saXN0JywgbGlzdFNlbGVjdG9yLnZhbHVlICk7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCAnbWM0d3BfYWN0aXZpdHlfdmlldycsIHZpZXdTZWxlY3Rvci52YWx1ZSApO1xufVxuXG5cbmZ1bmN0aW9uIGdldFJvd0RhdGEoKSB7XG5cblx0Ly8gcmVzdG9yZSBkYXRhXG5cdHJvd3MgPSBbXTtcblx0eU1pbiA9IDA7XG5cdHlNYXggPSAwO1xuXG5cdHJlbWVtYmVyVmFsdWVzKCk7XG5cblx0JC5nZXRKU09OKCBhamF4dXJsLCB7XG5cdFx0YWN0aW9uOiAnbWM0d3BfZ2V0X2FjdGl2aXR5Jyxcblx0XHRtYWlsY2hpbXBfbGlzdF9pZDogbGlzdFNlbGVjdG9yLnZhbHVlLFxuXHRcdHZpZXc6IHZpZXdTZWxlY3Rvci52YWx1ZVxuXHR9LCBmdW5jdGlvbiggcmVzICkge1xuXHRcdHJvd3MgPSByZXMuZGF0YTtcblxuXHRcdGlmKCAhIHJlcy5kYXRhIHx8ICEgcmVzLmRhdGEubGVuZ3RoICkge1xuXHRcdFx0Y2hhcnRFbGVtZW50LmlubmVySFRNTCA9ICdPb3BzLiBTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBmZXRjaGluZyBkYXRhIGZyb20gTWFpbENoaW1wLic7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yKCB2YXIgaT0wOyBpPCByb3dzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0Ly8gY29udmVydCBzdHJpbmdzIHRvIEphdmFTY3JpcHQgRGF0ZSBvYmplY3Rcblx0XHRcdHJvd3NbaV1bMF0udiA9IG5ldyBEYXRlKHJvd3NbaV1bMF0udik7XG5cblx0XHRcdC8vIGNhbGN1bGF0ZSBtYXhpbXVtIFkgdmFsdWUuXG5cdFx0XHRpZihyb3dzW2ldWzFdID4geU1heCApIHtcblx0XHRcdFx0eU1heCA9IHJvd3NbaV1bMV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKCB2aWV3U2VsZWN0b3IudmFsdWUgPT09ICdhY3Rpdml0eScgKSB7XG5cdFx0XHRcdC8vIGNhbGN1bGF0ZSBtaW5pbXVtIFkgdmFsdWVcblx0XHRcdFx0aWYocm93c1tpXVsyXSA8IHlNaW4gKSB7XG5cdFx0XHRcdFx0eU1pbiA9IHJvd3NbaV1bMl07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRkcmF3Q2hhcnQoKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdDaGFydCgpIHtcblxuXHR2YXIgY2hhcnQ7XG5cdHZhciBvcHRpb25zID0ge1xuXHRcdGhBeGlzOiB7XG5cdFx0XHR0aXRsZTogJ0RhdGUnLFxuXHRcdFx0Zm9ybWF0OiAnTU1NIGQnXG5cdFx0fSxcblx0XHR2QXhpczoge1xuXHRcdFx0dmlld1dpbmRvdzoge1xuXHRcdFx0XHRtYXg6IHlNYXggKiAxLjIsXG5cdFx0XHRcdG1pbjogMFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXhwbG9yZXI6IHtcblx0XHRcdG1heFpvb21PdXQ6Mixcblx0XHRcdGtlZXBJbkJvdW5kczogdHJ1ZVxuXHRcdH0sXG5cdFx0YW5pbWF0aW9uOiB7XG5cdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdGVhc2luZzogJ2xpbmVhcicsXG5cdFx0XHRzdGFydHVwOiB0cnVlXG5cdFx0fSxcblx0XHRoZWlnaHQ6IDQwMFxuXHR9O1xuXG5cdGlmKCB2aWV3U2VsZWN0b3IudmFsdWUgPT09ICdzaXplJyApIHtcblx0XHRjaGFydCA9IG5ldyBTaXplQ2hhcnQoIHJvd3MsIG9wdGlvbnMgKTtcblx0fSBlbHNlIHtcblx0XHRjaGFydCA9IG5ldyBBY3Rpdml0eUNoYXJ0KCByb3dzLCBvcHRpb25zICk7XG5cdH1cblxuXHRjaGFydC5kcmF3KCk7XG59XG5cblxuXG5mdW5jdGlvbiBBY3Rpdml0eUNoYXJ0KCByb3dzLCBvcHRpb25zICkge1xuXG5cdHZhciBkYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuXHRkYXRhLmFkZENvbHVtbignZGF0ZScsICdEYXRlJyk7XG5cdGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAnTmV3IFN1YnNjcmliZXJzJyk7XG5cdGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAnVW5zdWJzY3JpYmVzJyk7XG5cdGRhdGEuYWRkUm93cyhyb3dzKTtcblxuXHRvcHRpb25zLmlzU3RhY2tlZCA9IHRydWU7XG5cdG9wdGlvbnMudGl0bGUgPSAnQWN0aXZpdHkgZm9yIGxpc3QgJyArIGxpc3RTZWxlY3Rvci5vcHRpb25zW2xpc3RTZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lckhUTUw7XG5cdG9wdGlvbnMudkF4aXMudGl0bGUgPSBcIlN1YnNjcmliZXIgQWN0aXZpdHlcIjtcblx0b3B0aW9ucy52QXhpcy52aWV3V2luZG93Lm1pbiA9IHlNaW4gKiAxLjI7XG5cblx0ZnVuY3Rpb24gZHJhdygpIHtcblx0XHR2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29sdW1uQ2hhcnQoY2hhcnRFbGVtZW50KTtcblx0XHRjaGFydC5kcmF3KGRhdGEsIG9wdGlvbnMpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRkcmF3OiBkcmF3XG5cdH1cblxufVxuXG5mdW5jdGlvbiBTaXplQ2hhcnQoIHJvd3MsIG9wdGlvbnMgKSB7XG5cblx0dmFyIGRhdGEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG5cdGRhdGEuYWRkQ29sdW1uKCdkYXRlJywgJ0RhdGUnKTtcblx0ZGF0YS5hZGRDb2x1bW4oJ251bWJlcicsICdTdWJzY3JpYmVycycpO1xuXHRkYXRhLmFkZFJvd3Mocm93cyk7XG5cblx0b3B0aW9ucy50aXRsZSA9IFwiTGlzdCBzaXplIGZvciBsaXN0IFwiICsgbGlzdFNlbGVjdG9yLm9wdGlvbnNbbGlzdFNlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVySFRNTDtcblx0b3B0aW9ucy52QXhpcy50aXRsZSA9IFwiTnVtYmVyIG9mIFN1YnNjcmliZXJzXCI7XG5cdG9wdGlvbnMudkF4aXMudmlld1dpbmRvdy5taW4gPSAwO1xuXHRvcHRpb25zLmxlZ2VuZCA9IHsgcG9zaXRpb246ICdub25lJyB9O1xuXG5cdGZ1bmN0aW9uIGRyYXcoKSB7XG5cdFx0dmFyIGNoYXJ0ID0gbmV3IGdvb2dsZS5jaGFydHMuTGluZShjaGFydEVsZW1lbnQpO1xuXHRcdGNoYXJ0LmRyYXcoZGF0YSwgb3B0aW9ucyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGRyYXc6IGRyYXdcblx0fVxufSJdfQ==
