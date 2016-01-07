=== MailChimp Activity ===
Contributors: Ibericode, DvanKooten, iMazed, hchouhan
Donate link: https://mc4wp.com/#utm_source=wp-plugin-repo&utm_medium=mc4wp-activity&utm_campaign=donate-link
Tags: mailchimp,mc4wp,activity,newsletter
Requires at least: 3.8
Tested up to: 4.4
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Shows activity for your MailChimp lists, right in your WordPress dashboard.

== Description ==

This plugin shows your MailChimp lists activity, right in your WordPress dashboard.

= MailChimp lists activity =

Once activated, it will show a new dashboard widget containing a bar-graph or line-graph ([screenshots](https://wordpress.org/plugins/mc4wp-activity/screenshots/)) showing day-to-day changes to your MailChimp lists. You can choose to view relative activity (daily subscribes vs. unsubscribes) or a line graph visualizing your total list sizes.

**Requirements**

This plugin has the following requirements.

- The [MailChimp for WordPress](https://wordpress.org/plugins/mailchimp-for-wp/) plugin.
- PHP 5.3 or higher.

To get started with the plugin, please have a look at the [installation guide](https://wordpress.org/plugins/mc4wp-activity/installation/).

== Installation ==

= MailChimp Activity =

Since this plugin depends on the [MailChimp for WordPress plugin](https://wordpress.org/plugins/mailchimp-for-wp/), you will need to install that first.

= Installing the plugin =

1. In your WordPress admin panel, go to *Plugins > New Plugin*, search for **MailChimp Activity** and click "*Install now*"
1. Alternatively, download the plugin files manually and upload the contents of `mailchimp-activity.zip` to your plugins directory, which usually is `/wp-content/plugins/`.
1. Activate the plugin
1. Make sure your API key is set.
1. You should now see a new widget on your dashboard. Enjoy!

== Frequently Asked Questions ==

= Which user roles can see the activity widget? =

By default, the widget will only be shown to users with `manage_options` capability (administrators).

This behaviour can be customized using the `mc4wp_activity_capability` filter.

`
// Show MailChimp Activity widget to editor role & up.
add_filter( 'mc4wp_activity_capability', function( $capability ) {
   return 'edit_posts';
});
`

== Screenshots ==

1. Showing list activity.
2. Showing total list size.

== Changelog ==

Initial release.
== Upgrade Notice ==
