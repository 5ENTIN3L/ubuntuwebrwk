// src/config/roles.ts

export const roles = {
  volunteer: {
    permissions: [
      'read_own_objectives',
      'create_own_objective',
      'update_own_objective',
      'delete_own_objective',
      'create_own_checkin',
      'read_own_checkins',
      'update_own_checkin',
      'delete_own_checkin',
      'read_articles',
    ],
  },
  staff: {
    permissions: [
      'read_own_objectives',
      'create_own_objective',
      'update_own_objective',
      'delete_own_objective',
      'create_own_checkin',
      'read_own_checkins',
      'update_own_checkin',
      'delete_own_checkin',
      'read_articles',
      'create_article',
      'update_own_article',
    ],
  },
  executive: {
    permissions: [
      'read_all_objectives',
      'read_all_checkins',
      'read_articles',
      'create_article',
      'update_any_article',
      'delete_any_article',
      'manage_users', // Example of a higher-level permission
    ],
  },
  admin: {
    permissions: [
      'create_any',
      'read_any',
      'update_any',
      'delete_any',
      'manage_users',
      'view_user_history',
    ],
  },
};
