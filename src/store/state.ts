import { cookie } from '@axmine/helper/lib/cookie'
import { Storage } from '@axmine/helper/lib/storage'
const localStorage = new Storage()
interface NavType {
  url: string;
  title: string;
  icon?: string;
  [key: string]: unknown;
}
function getUid (): number {
  let n = -1
  if (cookie.get('_uid_') && /^\d*$/.test(cookie.get('_uid_'))) {
    n = parseInt(cookie.get('_uid_'))
  }
  return n
}

function getNavs () {
  const navs = localStorage.get('_navs_')
  if (!Array.isArray(navs) || navs.length < 1) {
    return [{ url: '/', title: '控制台' }]
  } else {
    return navs
  }
  // return localStorage.get('_navs_') || [{ url: '/', title: '投票' }]
}
export interface State {
  layout: 'default' | 'home' | 'null';
  transition: string;
  token: string;
  navs: Array<NavType>;
  env: string;
  uid: number;
  account: Record<'visible', boolean>;
}
export const state: State = {
  layout: 'default',
  transition: '',
  token: cookie.get('_t_'),
  navs: getNavs() as Array<NavType>,
  env: 'pc',
  uid: getUid(),
  account: {
    visible: false
  }
}
