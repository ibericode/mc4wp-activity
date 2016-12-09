<?php

namespace MC4WP\Activity;

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
	protected $current_list_size = 0;

	/**
	 * @var int
	 */
	protected $days = 90;

	/**
	 * @param array $raw_data
	 * @param int $current_list_size
	 * @param int $days
	 */
	public function __construct( array $raw_data, $current_list_size, $days = 90 ) {
		$this->current_list_size = $current_list_size;
		$this->days = $days;
		$this->activity_data = $raw_data;
		$this->calculate();
	}

	/**
	 * Calculate list size data from activity data
	 */
	public function calculate() {
		$data = $this->activity_data;

		// limit to number of days
		if( count( $data ) > $this->days ) {
			$data = array_slice( $data, 0 - $this->days );
		}

		// reverse array if needed, we need to start today and work our way down
		if( count($data) > 1 && strtotime( $data[0]->day ) < strtotime( $data[1]->day ) ) {
			$data = array_reverse( $this->activity_data );
		}

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