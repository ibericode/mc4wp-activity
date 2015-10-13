<?php

namespace MC4WP\Activity;

use MC4WP_API;

class API extends MC4WP_API {

	public function get_lists_activity( $list_id ) {

		$args = array(
			'id' => $list_id
		);

		$result = $this->call( 'lists/activity', $args );

		// todo: validate result

		return $result;
	}

}