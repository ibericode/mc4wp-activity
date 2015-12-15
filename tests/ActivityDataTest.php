<?php

use MC4WP\Activity\ActivityData;

class ActivityDataTest extends PHPUnit_Framework_TestCase {


	public function test_to_array() {

		$data = array(
			(object) array(
				'day' => strtotime( 'today' ),
				'subs' => 10,
				'unsubs' => 0
			),
			(object) array(
				'day' => strtotime( 'yesterday' ),
				'subs' => 10,
				'unsubs' => 0
			)
		);

		$instance = new ActivityData( $data );
		self::assertCount( 2, $instance->to_array() );


	}

}