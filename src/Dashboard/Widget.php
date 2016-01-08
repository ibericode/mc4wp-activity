<?php

namespace MC4WP\Activity\Dashboard;

use MC4WP_MailChimp;
use WP_Screen;

/**
 * Class Widget
 * @package MC4WP\Activity\Dashboard
 *
 */
class Widget {

	/**
	 * @var string
	 */
	protected $plugin_file;

	/**
	 * @var string
	 */
	protected $plugin_version;

	/**
	 * @param string $plugin_file
	 * @param string $plugin_version
	 */
	public function __construct( $plugin_file, $plugin_version ) {
		$this->plugin_file = $plugin_file;
		$this->plugin_version = $plugin_version;
	}

	/**
	 * Add hooks
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'lazy_hooks' ) );
	}

	public function lazy_hooks() {

		$capability = 'manage_options';

		/**
		 * Filters the required capability for showing the Activity widget.
		 *
		 * Defaults to `manage_options`
		 *
		 * @param string $capability
		 */
		$capability = (string) apply_filters( 'mc4wp_activity_capability', $capability );

		if( ! current_user_can( $capability ) ) {
			return;
		}

		add_action( 'wp_dashboard_setup', array( $this, 'register' ) );
	}

	/**
	 * Register self as dashboard widget
	 */
	public function register() {

		// do nothing if API key is not set
		$options = mc4wp_get_options();
		if( empty( $options['api_key'] ) ) {
			return;
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

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

		// load minified version when SCRIPT_DEBUG is not enabled
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script( 'google-js-api', 'https://www.google.com/jsapi' );
		wp_enqueue_script( 'mc4wp-activity', plugins_url(  "/assets/js/dashboard-widget{$suffix}.js", $this->plugin_file ), array( 'google-js-api' ), $this->plugin_version, true );
		return true;
	}

	/**
	 * Output widget
	 */
	public function output() {

		$mailchimp = new MC4WP_MailChimp();
		$mailchimp_lists = $mailchimp->get_lists();
		$options = array(
			'activity' => __( 'Activity', 'mailchimp-activity' ),
			'size' => __( 'Size', 'mailchimp-activity' )
		);

		// <Wrapper>
		echo '<div style="margin: 0 auto 20px; text-align: center;">';

		// List <select>
		echo '<div style="display: inline-block; max-width: 50%;">';
		echo '<label for="mc4wp-activity-mailchimp-list">' . __( 'Select MailChimp list', 'mailchimp-activity' ) . '</label>';
		echo '<br />';
		echo '<select id="mc4wp-activity-mailchimp-list">';
		echo '<option disabled>' . __( 'MailChimp list', 'mailchimp-for-wp' ) . '</option>';
		foreach ( $mailchimp_lists as $list ) {
			echo sprintf( '<option value="%s">%s</option>', $list->id, $list->name );
		}
		echo '</select>';
		echo '</div>';

		// View <select>
		echo '<div style="display: inline-block;">';

		echo '<label for="mc4wp-activity-view" >' . __( 'Select view', 'mailchimp-activity' ) . '</label>';
		echo '<br />';
		echo '<select id="mc4wp-activity-view">';
		echo '<option disabled>' . __( 'View', 'mailchimp-for-wp' ) . '</option>';
		foreach( $options as $value => $label ) {
			echo sprintf( '<option value="%s">%s</option>', $value, $label );
		}
		echo '</select>';
		echo '</div>';

		// </Wrapper>
		echo '</div>';

		echo '<div id="mc4wp-activity-chart"><p class="help">' . __( 'Loading..', 'mailchimp-activity' ) . '</p></div>';
	}
}