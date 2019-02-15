=== MailChimp Activity ===
Contributors: Ibericode, DvanKooten, hchouhan
Donate link: https://mc4wp.com/#utm_source=wp-plugin-repo&utm_medium=mc4wp-activity&utm_campaign=donate-link
Tags: mailchimp,mc4wp,activity,newsletter
Requires at least: 4.1
Tested up to: 5.1
Stable tag: 1.0.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Requires PHP: 5.3

Shows activity for your MailChimp lists, right in your WordPress dashboard.

== Description ==

This plugin shows your MailChimp lists activity, right in your WordPress dashboard.

= MailChimp lists activity =

Once activated, it will show a new dashboard widget containing a bar-graph or line-graph ([screenshots](https://wordpress.org/plugins/mc4wp-activity/screenshots/)) showing day-to-day changes to your MailChimp lists. You can choose to view relative activity (daily subscribes vs. unsubscribes) or a line graph visualizing your total list sizes.

**Requirements**

This plugin has the following requirements.

- The [MailChimp for WordPress](https://wordpress.org/plugins/mailchimp-for-wp/) plugin (3.0 or higher).
- PHP 5.3 or higher.

To get started with the plugin, please have a look at the [installation guide](https://wordpress.org/plugins/mc4wp-activity/installation/).

== Installation ==

= MailChimp Activity =

Since this plugin depends on the [MailChimp for WordPress plugin](https://wordpress.org/plugins/mailchimp-for-wp/), you will need to install that first.

Also, please make sure that your webserver is running PHP 5.3 or higher.

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

= I've activated MailChimp Activity - but it does nothing =

This usually comes down to any (or multiple) of the following reasons.

- No API key is set in **MailChimp for WP > MailChimp**.
- You're running an older version of [MailChimp for WordPress](https://wordpress.org/plugins/mailchimp-for-wp/), version 3.0 or higher is required.
- Your server is running a very outdated version of PHP. MailChimp Activity requires at least PHP 5.3 or higher.
- If you see the widget but it's stuck at "loading..", there should be [a JavaScript error in your browser console](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers) telling us what exactly went wrong.

== Screenshots ==

1. Showing list activity.
2. Showing total list size.

== Changelog ==

#### 1.0.5 - December 9, 2016

**Fixes**

- Time period would not change. This fix depends on version 4.0.11 of [MailChimp for WordPress](https://wordpress.org/plugins/mailchimp-for-wp/changelog/).


#### 1.0.4 - August 1, 2016

**Improvements**

- Compatibility with upcoming [MailChimp for WordPress v4.0](https://mc4wp.com/kb/upgrading-to-4-0/) release.


#### 1.0.3 - February 17, 2016

**Improvements**

- Minor improvements to widget JavaScript.

**Additions**

- Add "period" option which lets you select time period for graph.


#### 1.0.2 - January 8, 2016

**Fixes**

Prevent fatal error by checking for [MailChimp for WordPress v3.0](https://mc4wp.com/blog/the-big-three-o-release/) before loading any code.


#### 1.0.1 - January 7, 2016

**Improvements**

Fail gracefully on servers running a PHP version older than PHP 5.3.


#### 1.0

Initial release.
== Upgrade Notice ==
