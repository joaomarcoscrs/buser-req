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
    ADD_REQ(state, req) {
      
      state.reqs[req.status].push({
         title: req.title,
         archived: req.archived,
         analysis: req.analysis,
         is_trash: req.is_trash,
         team: req.team,
         priority: req.priority,
         category: req.category,
         link: req.link,
         description: req.description
      })
    },
    SET_ARCHIVED_REQ(state, status, id, archived) {
      req = state.reqs[status].get(id=id)
      req.archived = archived
    },
    SET_ANALYSIS_REQ(state, status, id, analysis) {
      req = state.reqs[status].get(id=id)
      req.analysis = analysis
    },
    DELETE_REQ(state, status, id) {
      req = state.reqs[status].get(id=id)
      req.is_trash = true
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
          console.log(R.data)
      })
    },
    addReq(store, status, title='Card novo', archived='f', analysis='f', is_trash='f', team='-', priority=3, category='-', link='-', description='Sem descrição') {
      return AppApi.create_req(status.status, title, archived, analysis, is_trash, team, priority, category, link, description).then(R => {
        store.commit('ADD_REQ', R.data)
      })
    },
    archiveReq(store, id) {
      return AppApi.archive_req(id).then(R => {
          store.commit('SET_ARCHIVED_REQ', R.data)
      })
    },
    analyzeReq(store, id) {
      return AppApi.analyze_req(id).then(R => {
          store.commit('SET_ANALYSIS_REQ', R.data)
      })
    },
    deleteReq(store, id) {
      return AppApi.delete_req(id).then(R => {
          store.commit('DELETE_REQ', R.data)
      })
    },
  }
})

export default store