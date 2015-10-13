<?php
/*
Plugin Name: MailChimp Activity
Plugin URI: https://mc4wp.com/#utm_source=wp-plugin&utm_medium=mailchimp-for-wp&utm_campaign=plugins-page
Description: Shows your MailChimp activity, right in your WordPress dashboard.
Version: 1.0
Author: ibericode
Author URI: https://ibericode.com/
Text Domain: mailchimp-lists-activity-widget
Domain Path: /languages
License: GPL v2

MailChimp for WordPress - Lists Activity Widget
Copyright (C) 2015, Danny van Kooten, hi@dannyvankooten.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

use MC4WP\Activity;

// Prevent direct file access
if( ! defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

add_action( 'plugins_loaded', function() {

	// load autoloader
	require __DIR__ . '/vendor/autoload.php';

	// instantiate plugin object
	// todo: move to where it's needed
	$plugin = new MC4WP\Activity\Plugin( __FILE__, '1.0' );

	// this plugin is admin only
	if( is_admin() ) {
		$widget = new MC4WP\Activity\Dashboard\Widget( $plugin );
		$widget->add_hooks();
	}


}, 20 );