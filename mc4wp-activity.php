<?php
/*
Plugin Name: MailChimp Activity
Plugin URI: https://mc4wp.com/#utm_source=wp-plugin&utm_medium=mc4wp-activity&utm_campaign=plugins-page
Description: Shows your MailChimp activity, right in your WordPress dashboard.
Version: 1.0
Author: ibericode
Author URI: https://ibericode.com/
Text Domain: mailchimp-activity
Domain Path: /languages
License: GPL v2

MailChimp Activity
Copyright (C) 2015-2016, ibericode <support@ibericode.com>

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

use MC4WP_Plugin as Plugin;
use MC4WP\Activity\AJAX;

defined( 'ABSPATH' ) or exit;

/**
 * Bootstraps the plugin
 *
 * @ignore
 */
function __load_mailchimp_activity() {

	// check if MailChimp for WordPress is installed.
	if( ! defined( 'MC4WP_VERSION' ) ) {
		return;
	}

	// load autoloader
	require __DIR__ . '/vendor/autoload.php';

	// instantiate plugin object
	$plugin = new Plugin( __FILE__, '1.0' );

	$widget = new MC4WP\Activity\Dashboard\Widget( $plugin );
	$widget->add_hooks();

	if( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		$ajax = new AJAX();
		$ajax->hook();
	}
}

// only hook when this is an admin request
if( is_admin() ) {
	add_action( 'plugins_loaded', '__load_mailchimp_activity', 30 );
}


