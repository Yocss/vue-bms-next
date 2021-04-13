// import Cookie from '@/plugins/cookie'
import { cookie } from '@axmine/helper/lib/cookie'
interface NavType {
  url: string;
  icon: string;
  title: string;
}
function getUid (): number {
  let n = -1
  if (cookie.get('_uid_') && /^\d*$/.test(cookie.get('_uid_'))) {
    n = parseInt(cookie.get('_uid_'))
  }
  return n
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
  navs: [
    { url: '/', icon: 'wap-home', title: '投票' },
    // { url: '/rank', icon: 'fire', title: '排行榜' },
    { url: '/manager', icon: 'manager', title: '管理' }
  ],
  env: 'mb',
  uid: getUid(),
  account: {
    visible: false
  }
}
