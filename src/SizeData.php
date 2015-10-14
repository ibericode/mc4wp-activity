<?php

namespace MC4WP\Activity;

use DateTime;
use MC4WP_MailChimp;

class SizeData {

	/**
	 * @var array
	 */
	protected $data  = array();

	/**
	 * @var int
	 */
	protected $list_size_today = 0;

	/**
	 * @param API $api
	 */
	public function __construct( API $api, $list_id ) {

		// get list data
		$mailchimp = new MC4WP_MailChimp();
		$list = $mailchimp->get_list( $list_id );
		$this->list_size_today = $list->subscriber_count;

		$this->data = $api->get_lists_activity( $list_id );
		$this->data = array_slice( $this->data, -90 );

		$this->calculate();
	}

	public function calculate() {
		// @todo move stuff here
	}

	/**
	 * @return array
	 */
	public function to_array() {

		$array = array();

		$data = array_reverse( $this->data );
		$size_at_day = $this->list_size_today;

		foreach( $data as $day_object ) {

			$size_at_day = $size_at_day - $day_object->subs + $day_object->unsubs;

			$array[] = array(
				array(
					'v' => date( 'c', strtotime( $day_object->day ) ),
					'f' => date( get_option( 'date_format' ), strtotime( $day_object->day ) )
				),
				$size_at_day

			);
		}

		return $array;
	}
}