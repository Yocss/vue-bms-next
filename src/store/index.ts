/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseStore, Store, ActionTree } from 'vuex'
import { state, State } from './state'
// import { useRoute } from 'vue-router'
import { mutations } from './mutations'
import { cookie } from '@axmine/helper/lib/cookie'
export const key: InjectionKey<Store<State>> = Symbol('For state.state')

const actions: ActionTree<State, State> = {
  SetStore (context, data: Record<string, any>) {
    context.commit('SET_STORE', data)
  },
  SetAccount ({ dispatch, state }, visible: boolean) {
    if (state.env === 'mp') {
      const wx = (window as any).wx
      wx.miniProgram.navigateTo({ url: '/pages/login/login?login=1' })
    } else {
      dispatch('SetStore', { account: { visible } })
    }
  },
  SetToken ({ dispatch }, token: string) {
    dispatch('SetStore', { token })
    const key = '_t_'
    const uid = '_uid_'
    if (token) {
      cookie.remove(key)
      cookie.set(key, token)
      // cookie.set(uid, token)
    } else {
      cookie.remove(key)
      cookie.remove(uid)
    }
  }
}
export const store = createStore<State>({ state, mutations, actions, modules: {} })
export function useStore () { return baseStore(key) }
