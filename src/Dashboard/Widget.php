<?php

namespace MC4WP\Activity\Dashboard;

use MC4WP\Activity\Plugin;
use MC4WP\Activity\Data;
use MC4WP\Activity\API;

use WP_Screen;

class Widget {

	/**
	 * @var Plugin
	 */
	protected $plugin;

	/**
	 * @param Plugin $plugin
	 */
	public function __construct( Plugin $plugin ) {
		$this->plugin = $plugin;
	}

	public function add_hooks() {
		add_action( 'wp_dashboard_setup', array( $this, 'register' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function register() {
		wp_add_dashboard_widget(
			'mc4wp_activity_widget',         // Widget slug.
			'MailChimp Activity',         // Title.
			array( $this, 'output' ) // Display function.
		);
	}

	public function enqueue_scripts() {
		$screen = get_current_screen();

		if( ! $screen instanceof WP_Screen ) {
			return false;
		}

		if( $screen->base !== 'dashboard' ) {
			return false;
		}

		wp_enqueue_script( 'mc4wp-activity',  $this->plugin->url( '/assets/js/dashboard-widget.js' ), array(), $this->plugin->version );
		return true;
	}

	public function output() {

		/* @todo move to setting, preferably in JS only */
		$list_id = 'a940232df9';
		$api = new API( mc4wp_get_options('general')['api_key'] );
		$data = new Data( $api, $list_id );
		//wp_localize_script( 'mc4wp-activity', 'mc4wp_activity_rows', $data->toArray() );
		?>
		<!--Div that will hold the pie chart-->
		<div id="chart_div">Loading..</div>

		<?php /* @todo move to separate JS file */ ?>
		<!--Load the AJAX API-->
		<script type="text/javascript" src="https://www.google.com/jsapi"></script>
		<script type="text/javascript">

			var rows = <?php echo json_encode( $data->toArray() ); ?>;

			// convert strings to JavaScript Date object
			for( var i=0; i<rows.length; i++ ) {
				rows[i][0].v = new Date(rows[i][0].v);
			}

			google.load('visualization', '1', {packages: ['corechart', 'bar']});
			google.setOnLoadCallback(drawStacked);

			function drawStacked() {
				var data = new google.visualization.DataTable();
				data.addColumn('date', 'Date');
				data.addColumn('number', 'New Subscribers');
				data.addColumn('number', 'Unsubscribes');

				data.addRows(rows);

				var options = {
					title: 'Activity for list "MailChimp for WordPress"',
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

				var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
				chart.draw(data, options);
			}
		</script>
		<?php
	}
}