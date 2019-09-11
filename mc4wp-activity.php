<?php
/*
Plugin Name: MC4WP: Mailchimp Activity
Plugin URI: https://mc4wp.com/#utm_source=wp-plugin&utm_medium=mc4wp-activity&utm_campaign=plugins-page
Description: Shows your Mailchimp activity, right in your WordPress dashboard.
Version: 1.0.6
Author: ibericode
Author URI: https://ibericode.com/
Text Domain: mailchimp-activity
Domain Path: /languages
License: GPL v2

Mailchimp Activity
Copyright (C) 2015-2019, ibericode <support@ibericode.com>

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

defined( 'ABSPATH' ) or exit;

/**
 * Bootstraps the plugin
 *
 * @ignore
 */
function _load_mailchimp_activity() {

	// check if Mailchimp for WordPress v3.0 or later is installed.
	if( ! defined( 'MC4WP_VERSION' ) || version_compare( MC4WP_VERSION, '3.0', '<' ) ) {
		return;
	}

    require_once __DIR__ . '/src/Widget.php';
    require_once __DIR__ . '/src/functions.php';

	// instantiate plugin object
	$classname = 'MC4WP\\Activity\\Widget';

    /** @var \MC4WP\Activity\Widget $widget */
	$widget = new $classname( __FILE__, '1.0.2' );
	$widget->add_hooks();

	add_action( 'wp_ajax_mc4wp_get_activity', 'MC4WP\\Activity\\ajax_handler' );

}

// only hook when this is an admin request & PHP > 5.3
if( is_admin() && version_compare( PHP_VERSION, '5.3', '>=' ) ) {
	add_action( 'plugins_loaded', '_load_mailchimp_activity', 30 );
}


