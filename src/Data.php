<?php

namespace MC4WP\Activity;

use DateTime;

class Data {

	/**
	 * @param API $api
	 */
	public function __construct( API $api, $list_id ) {
		$this->data = $api->get_lists_activity( $list_id );
		$this->data = array_slice( $this->data, -90 );
	}

	/**
	 * @return array
	 */
	public function toArray() {

		$array = array();

		foreach( $this->data as $day_object ) {
			$array[] = array(
				array(
					'v' => date( 'c', strtotime( $day_object->day ) ),
					'f' => date( get_option( 'date_format' ), strtotime( $day_object->day ) )
				),
				$day_object->subs,
				-$day_object->unsubs
			);
		}

		return $array;
	}
}