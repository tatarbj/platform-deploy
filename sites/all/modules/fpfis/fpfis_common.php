<?php 
/**
 * This file must be included in drupal settings file (site level)
 * with $fpfis_conf populated :
 */
 if(!is_array($fpfis_conf))
   die('Please setup $fpfis_conf in settings.local.php');

/**
 * setup default ECAS settings for ecas module :
 */
 define('FPFIS_ECAS_URL',array_key_exists('ecas_host',$fpfis_conf) ? $fpfis_conf['ecas_host'] : 'webgate.ec.europa.eu' );
 define('FPFIS_ECAS_PORT',array_key_exists('ecas_port',$fpfis_conf) ? $fpfis_conf['ecas_port'] : 443 );
 define('FPFIS_ECAS_URI', '/cas');

/**
 * EC network fixes :
 */
 if(array_key_exists('reverse_proxy',$fpfis_conf)) {
   $conf['reverse_proxy'] = TRUE;
   $conf['reverse_proxy_addresses'] = array($_SERVER['REMOTE_ADDR']);
   if(!empty($_SERVER['HTTP_CLIENT_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CLIENT_IP'];
 }

/**
 * Gelf log setup :
 */
 if(array_key_exists('gelf_group',$fpfis_conf))
 $conf['gelf_log_group'] = $fpfis_conf['gelf_group'];
 $conf['gelf_log_host'] = FPFIS_GELF_SERVER;
 $conf['gelf_log_port'] = FPFIS_GELF_PORT;
 $conf['gelf_log_mtu'] = 1024;
/**
 * Proxy setup :
 */
 if (is_defined('FPFIS_PROXY_SERVER')) {
   $conf['proxy_server'] = FPFIS_PROXY_SERVER; 
   $conf['proxy_port'] = FPFIS_PROXY_PORT;
   $conf['proxy_user_agent'] = 'nexteuropa-drupal/0.1';
   $conf['proxy_exceptions'] = array('127.0.0.1', 'localhost');
   if(!empty($fpfis_conf['proxy_exceptions']) && is_array($fpfis_conf['proxy_exceptions']))
     $conf['proxy_exceptions'] = array_merge($conf['proxy_exceptions'],$fpfis_conf['proxy_exceptions']);
   }
 if(is_defined('FPFIS_PROXY_USERNAME')) {
   $conf['proxy_username'] = FPFIS_PROXY_USERNAME;
   $conf['proxy_password'] = FPFIS_PROXY_PASSWORD;
 }


/**
 * URL Setup/fixes
 */
 $_SERVER['HTTP_HOST'] = $fpfis_conf['host'];
 $_SERVER['HTTPS'] = $fpfis_conf['https'] ? 'on' : 'off';
 $_SERVER['SERVER_PORT'] = $fpfis_conf['port'];
 $base_path = $fpfis_conf['path'];
 $base_http =  $fpfis_conf['https'] ? 'https://' : 'http://';
 $base_http .= $fpfis_conf['host'];
 if(($fpfis_conf['https'] && $fpfis_conf['port'] != 443) || (!$fpfis_conf['https'] && $fpfis_conf['port'] != 80))
  $base_http .= ':'.$fpfis_conf['port'];
 $base_url = $base_http.$fpfis_conf['path'];

/**
 * Cookie setup :
*/
 ini_set('session.cookie_domain', $fpfis_conf['host']);
 ini_set('session.cookie_path', $fpfis_conf['path']);
 $conf['reverse_proxy'] = TRUE;
