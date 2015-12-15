<?php

namespace MC4WP\Activity;

use MC4WP_MailChimp;

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

		// fetch data
		$raw_data = $api->get_lists_activity( $list_id );

		if( $_REQUEST['view'] === 'activity' ) {
			$data      = new ActivityData( $raw_data );
		} else {
			$mailchimp = new MC4WP_MailChimp();
			$list = $mailchimp->get_list( $list_id );
			$data      = new SizeData( $raw_data, $list->subscriber_count );
		}

		wp_send_json_success( $data->to_array() );
	}

}