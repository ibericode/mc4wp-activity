<?php

namespace MC4WP\Activity;

use DateTime;

class SizeData {

	/**
	 * @var array
	 */
	protected $activity_data  = array();

	/**
	 * @var
	 */
	protected $size_data = array();

	/**
	 * @var int
	 */
	protected $list_size_today = 0;

	/**
	 * @param array $raw_data
	 * @param int $current_list_size
	 * @param int $days
	 */
	public function __construct( array $raw_data, $current_list_size, $days = 90 ) {
		$this->current_list_size = $current_list_size;
		$this->activity_data = array_slice( $raw_data, 0 - $days );

		$this->calculate();
	}

	/**
	 * Calculate list size data from activity data
	 */
	public function calculate() {
		// start at today and then fill all the way back
		$data = array_reverse( $this->activity_data );
		$size_at_day = $this->current_list_size;
		$date_format = get_option( 'date_format' );

		foreach( $data as $day_object ) {

			$size_at_day = $size_at_day - $day_object->subs + $day_object->unsubs;

			$this->size_data[] = array(
				array(
					'v' => date( 'c', strtotime( $day_object->day ) ),
					'f' => date( $date_format, strtotime( $day_object->day ) )
				),
				$size_at_day
			);
		}
	}

	/**
	 * @return array
	 */
	public function to_array() {
		return $this->size_data;
	}
}