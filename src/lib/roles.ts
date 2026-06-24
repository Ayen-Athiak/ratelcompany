export type Role = 'admin' | 'editor' | 'viewer'

export const ROLE_TABS: Record<Role, string[]> = {
  admin:  ['quotes', 'products', 'posts', 'team'],
  editor: ['products', 'posts', 'team'],
  viewer: ['quotes'],
}

export const ROLE_ACTIONS: Record<Role, { markRead: boolean; togglePublish: boolean }> = {
  admin:  { markRead: true,  togglePublish: true  },
  editor: { markRead: false, togglePublish: true  },
  viewer: { markRead: false, togglePublish: false },
}

export const ROLE_LABELS: Record<Role, string> = {
  admin:  'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

export function resolveRole(meta: Record<string, unknown> | undefined): Role {
  const r = meta?.role
  if (r === 'admin' || r === 'editor' || r === 'viewer') return r
  return 'viewer' // safe default — unknown users get least access
}
