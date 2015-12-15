<?php

namespace MC4WP\Activity;

/**
 * Class AJAX
 *
 * @package MC4WP\Activity
 */
class AJAX {

	public function hook() {
		add_action( 'wp_ajax_mc4wp_get_activity', array( $this, 'get_activity' ) );
	}

	/**
	 * Get activity
	 */
	public function get_activity() {
		$list_id   = (string) $_REQUEST['mailchimp_list_id'];
		$options = mc4wp_get_options();
		$api       = new API( $options['api_key'] );

		if( $_REQUEST['view'] === 'activity' ) {
			$data      = new ActivityData( $api, $list_id );
		} else {
			$data      = new SizeData( $api, $list_id );
		}

		wp_send_json_success( $data->to_array() );
	}

}