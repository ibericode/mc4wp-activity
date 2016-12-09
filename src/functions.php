<?php

namespace MC4WP\Activity;

use MC4WP_MailChimp;
use MC4WP_API_v3;

function ajax_handler() {
    $list_id   = (string) $_GET['mailchimp_list_id'];
    $period  = isset( $_GET['period'] ) ? (int) $_GET['period'] : 30;
    $options = mc4wp_get_options();

    if( class_exists( 'MC4WP_API_v3' ) ) {
        $api = new MC4WP_API_v3( $options['api_key'] );
        $raw_data = $api->get_list_activity( $list_id, array( 'count' => $period ) );
    } else {
        // for backwards compatibility, use old API v2 class.
        require_once __DIR__ . '/API.php';
        $api       = new API( $options['api_key'] );
        $raw_data = $api->get_lists_activity( $list_id );
    }

    if( $_REQUEST['view'] === 'activity' ) {
        require_once __DIR__ . '/ActivityData.php';
        $data      = new ActivityData( $raw_data, $period );
    } else {
        require_once __DIR__ . '/SizeData.php';
        $mailchimp = new MC4WP_MailChimp();
        $list = $mailchimp->get_list( $list_id );
        $data      = new SizeData( $raw_data, $list->subscriber_count, $period );
    }

    wp_send_json_success( $data->to_array() );
}