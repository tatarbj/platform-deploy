<?php
// if there's a {{ sitename }}.conf.d folder settings, use it so :
/**
 * Eg :
 * /var/www/site_01 -> webroot
 * /var/www/site_01.conf.d/settings.php
 * /var/www/site_01.conf.d/settings.post.php
 */
$strippedRoot = rtrim(DRUPAL_ROOT,'/');

if(file_exists($strippedRoot.'.conf.d/settings.php')) {
    // This file was dropped for us by config management :
    // @See : https://github.com/ec-europa/salt-reference/blob/master/sites/drupal7/settings.php.jinja
    putenv('DRUPAL_LOCAL_SETTINGS_LOCATION='.$strippedRoot.'.conf.d/settings.php');
    define('FPFIS_SALT_CONFIG_USED', true);
} else {
    // Old behavior :
    putenv('DRUPAL_LOCAL_SETTINGS_LOCATION=' . $strippedRoot . '/../settings.common.php');
    define('FPFIS_SALT_CONFIG_USED', false);
}
define('FPFIS_ENV_RUNNING', strlen(getenv('FPFIS_ENVIRONMENT')) > 0);