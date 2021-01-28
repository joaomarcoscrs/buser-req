import Vuex from 'vuex'
import AppApi from '~apijs'

const store = () => new Vuex.Store({

  state: {
    logged_user: undefined,
    snack: {},
    reqs: {}
  },
  mutations: {
    SET_LOGGED_USER(state, logged_user) {
      console.log('set logged user: '+JSON.stringify(logged_user))
      state.logged_user = logged_user
    },
    SET_SNACK_STATE(state, newstate) {
      state.snack = newstate
    },
    SET_REQS(state, reqs) {
      state.reqs = reqs
    },
    ADD_REQ(state, status) {
      state.reqs[status].push({
         id: 100,
         title: 'Card novo',
         archived: false,
         team: '-',
         priority: '-',
         category: '-',
         link: '-',
         description: 'Sem descrição'
      })
    }
  },
  getters: {
    logged_user(state) {
      return state.logged_user
    },
    snack (state) {
      return state.snack
    },
    reqs (state) {
      return state.reqs
    }
  },
  actions: {
    fetchReqs(store) {
      return AppApi.list_reqs().then(R => {
          store.commit('SET_REQS', R.data)
      })
    }
  }
})

export default store