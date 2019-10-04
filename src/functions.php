<?php

namespace MC4WP\Activity;

use MC4WP_MailChimp;

function ajax_handler() {
    $list_id   = (string) $_GET['mailchimp_list_id'];
    $period  = isset( $_GET['period'] ) ? (int) $_GET['period'] : 30;
    $api = mc4wp_get_api_v3();
    $raw_data = $api->get_list_activity( $list_id, array( 'count' => $period ) );

    if( $_REQUEST['view'] === 'activity' ) {
        require_once __DIR__ . '/ActivityData.php';
        $data      = new ActivityData( $raw_data, $period );
    } else {
        require_once __DIR__ . '/SizeData.php';
        $mailchimp = new MC4WP_MailChimp();
        $list = $mailchimp->get_list( $list_id );
        $data      = new SizeData( $raw_data, $list->stats->member_count, $period );
    }

    wp_send_json_success( $data->to_array() );
}