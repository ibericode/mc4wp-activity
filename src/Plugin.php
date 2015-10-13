<?php

namespace MC4WP\Activity;

class Plugin {

	public $file;

	public $dir;

	public $version;

	/**
	 * @param $file
	 * @param $version
	 */
	public function __construct( $file, $version ) {
		$this->file = $file;
		$this->dir = dirname( $file );
		$this->version = $version;
	}

	/**
	 * @param string $path
	 *
	 * @return string
	 */
	public function url( $path = '' ) {
		return plugins_url( $path, $this->file );
	}


}