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
	 * @param array $raw_data
	 */
	public function __construct( array $raw_data ) {
		// get last 60 days of data
		// TODO: Make this period customizable
		$this->data = array_slice( $raw_data, -30 );
	}

	/**
	 * @return array
	 */
	public function to_array() {

		$array = array();
		$date_format = get_option( 'date_format' );

		foreach( $this->data as $day_object ) {
			$array[] = array(
				array(
					'v' => date( 'c', strtotime( $day_object->day ) ),
					'f' => date( $date_format, strtotime( $day_object->day ) )
				),
				$day_object->subs,
				-$day_object->unsubs
			);
		}

		return $array;
	}
}