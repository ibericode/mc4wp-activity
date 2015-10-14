<?php

namespace MC4WP\Activity\Dashboard;

use MC4WP\Activity\Plugin;
use MC4WP\Activity\Data;
use MC4WP\Activity\API;

use MC4WP_MailChimp;
use WP_Screen;

/**
 * Class Widget
 * @package MC4WP\Activity\Dashboard
 *
 * @todo stop doing things when dependencies not ready (no API key, etc..)
 */
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

	/**
	 * Add hooks
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'lazy_hooks' ) );
	}

	public function lazy_hooks() {

		if( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		add_action( 'wp_dashboard_setup', array( $this, 'register' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Register self as dashboard widget
	 */
	public function register() {
		wp_add_dashboard_widget(
			'mc4wp_activity_widget',         // Widget slug.
			'MailChimp Activity',         // Title.
			array( $this, 'output' ) // Display function.
		);
	}

	/**
	 * Enqueue scripts, but only if on dashboard page.
	 *
	 * @return bool
	 */
	public function enqueue_scripts() {
		$screen = get_current_screen();

		if( ! $screen instanceof WP_Screen ) {
			return false;
		}

		if( $screen->base !== 'dashboard' ) {
			return false;
		}

		wp_enqueue_script( 'google-js-api', 'https://www.google.com/jsapi' );
		wp_enqueue_script( 'mc4wp-activity',  $this->plugin->url( '/assets/js/dashboard-widget.js' ), array( 'google-js-api' ), $this->plugin->version, true );
		return true;
	}

	/**
	 * Output widget
	 */
	public function output() {
		$mailchimp = new MC4WP_MailChimp();
		$options = array(
			'activity' => __( 'Activity', 'mailchimp-activity' ),
			'size' => __( 'Size', 'mailchimp-activity' )
		);

		echo '<p>';
		echo '<label for="mc4wp-activity-mailchimp-list">Select MailChimp list</label>' . ' &nbsp; ';;
		echo '<select id="mc4wp-activity-mailchimp-list">';
		foreach ( $mailchimp->get_lists() as $list ) {
			echo sprintf( '<option value="%s">%s</option>', $list->id, $list->name );
		}
		echo '</select>';
		echo '<select id="mc4wp-activity-view">';
		foreach( $options as $value => $label ) {
			echo sprintf( '<option value="%s">%s</option>', $value, $label );
		}
		echo '</select>';
		echo '</p>';

		echo '<div id="mc4wp-activity-chart"><p class="help">Loading..</p></div>';
	}
}