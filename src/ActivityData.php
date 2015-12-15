<?php

namespace MC4WP\Activity;

/**
 * Class ActivityData
 * @package MC4WP\Activity
 */
class ActivityData {

	/**
	 * @var array
	 */
	protected $data  = array();

	/**
	 * @param API $api
	 * @param string $list_id
	 */
	public function __construct( API $api, $list_id ) {
		$this->data = $api->get_lists_activity( $list_id );

		// get last 60 days of data
		// TODO: Make this period customizable
		$this->data = array_slice( $this->data, -30 );
	}

	/**
	 * @return array
	 */
	public function to_array() {

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