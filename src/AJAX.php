<?php

namespace MC4WP\Activity;

class AJAX {

	public function hook() {
		add_action( 'wp_ajax_mc4wp_get_activity', array( $this, 'get_activity' ) );
	}

	public function get_activity() {
		$list_id   = $_REQUEST['mailchimp_list_id'];
		$api       = new API( mc4wp_get_options( 'general' )['api_key'] );
		$data      = new Data( $api, $list_id );
		wp_send_json_success( $data->to_array() );
	}

}