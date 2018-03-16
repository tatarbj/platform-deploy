<?php
/**
 * @file
 * Drush commands for NESRM Cookbook module.
 */

/**
 * Implements hook_drush_command().
 */
function nesrm_cookbook_drush_command() {
  $items['cookbook-chapter1'] = array(
    'description' => 'NESRM Cookbook drush command for its Chapter One.',
    'aliases' => array('cbc1'),
    'callback' => 'nesrm_cookbook_drush_command_chapter_one',
    'options' => array(
      'list' => 'List of the currently executed restrictions.',
      'module' => 'Name of the module.',
      'revert' => 'Revert a currently active restriction.'
    ),
  );
  return $items;
}

/**
 * Drush command to handle NESRM Cookbook Chapter One.
 * Options:
 *   --list: Lists all the currently executed advisories.
 *   --revert: Lists all the advisories with a choice of reverting one.
 *   --module: Asks for a module out of the enabled ones, then lists its
 *       permissions with a choise of execute chapter one on it.
 */
function nesrm_cookbook_drush_command_chapter_one() {
  if (drush_get_option('list')) {
    drush_print(_nesrm_cookbook_drush_command_chapter_one_get_items());
  }
  if (drush_get_option('revert')) {
    $list = _nesrm_cookbook_drush_command_chapter_one_get_items();
    drush_print($list);
    if ($list != 'Currently no chapter is executed.') {
      $options = nesrm_cookbook_chapter_one_items();
      foreach ($options as $advisory => $data) {
        $advisories[$advisory] = $advisory;
      }
      $advisory = drush_choice($advisories, dt('Choose the executed advisory that you want to revert.'));
      nesrm_cookbook_chapter_one_revoke($advisory);
      drush_print("You have reverted the '$advisory' advisory.");
    }
  }
  else {
    $module = drush_get_option('module', '');
    if ($module == '') {
      $options = module_list(FALSE, FALSE, TRUE);
      $module = drush_choice($options, dt('Choose the module that has to be restricted.'));
    }
    $permissions = module_invoke($module, 'permission');
    if (!empty($permissions)) {
      $options = array();
      foreach ($permissions as $machine_name => $data) {
        $options[$machine_name] = $data['title'];
      }
      if (!empty($options)) {
        $permission = drush_choice($options, dt('Choose the permission that has to be restricted.'));
        $roles = user_roles(FALSE, $permission);
        $admin_role = user_role_load_by_name('administrator');
        if (count($roles) == 1 && isset($roles[$admin_role->rid])) {
          drush_print("NESRM Cookbook Chapter One can't be applied because of no roles will be revoked.");
        }
        else {
          $advisory = drush_prompt(dt('Insert the id of the security advisory.'));
          $data = array(
            'advisory' => $advisory,
            'permission' => $permission,
            'module_name' => $module,
          );
          nesrm_cookbook_chapter_one_execution($data);
          drush_print("NESRM Cookbook Chapter One is executed for '$module' module defined '$permission' permission.");
        }
      }
    }
    else {
      drush_print("NESRM Cookbook Chapter One can't be applied because module doesn't have permissions.");
    }
  }
}

/**
 * Get the current executed chapters.
 *
 * @return string
 *   List of the currently executed items or message about no.
 */
function _nesrm_cookbook_drush_command_chapter_one_get_items() {
  $items = nesrm_cookbook_chapter_one_items();
  if (!empty($items)) {
    $rows[] = array(
      t('Advisory'),
      t('Module name'),
      t('Permission'),
      t('Execution time'),
    );
    foreach ($items as $advisory => $data) {
      $rows[] = array(
        $advisory,
        $data['module'],
        $data['permission'],
        format_date($data['time'], 'long'),
      );
    }
    return drush_format_table($rows, TRUE);
  }
  return 'Currently no chapter is executed.';
}