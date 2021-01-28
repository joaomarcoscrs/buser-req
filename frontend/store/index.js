import Vuex from 'vuex'
import AppApi from '~apijs'

const store = () => new Vuex.Store({

  state: {
    logged_user: undefined,
    snack: {},
    reqs_board: {},
    reqs_analysis: {},
    reqs_archived: {}
  },
  mutations: {
    SET_LOGGED_USER(state, logged_user) {
      console.log('set logged user: '+JSON.stringify(logged_user))
      state.logged_user = logged_user
    },
    SET_SNACK_STATE(state, newstate) {
      state.snack = newstate
    },
    SET_REQS_BOARD(state, reqs) {
      let board_backlog = reqs['backlog'].filter(req => !req.archived && !req.analysis)
      let board_pending = reqs['pending'].filter(req => !req.archived && !req.analysis)
      let board_ongoing = reqs['ongoing'].filter(req => !req.archived && !req.analysis)
      let board_done = reqs['done'].filter(req => !req.archived && !req.analysis)
      let board_delivered = reqs['delivered'].filter(req => !req.archived && !req.analysis)
      state.reqs_board = {backlog: board_backlog,
              pending: board_pending,
              ongoing: board_ongoing,
              done: board_done,
              delivered: board_delivered}
    },
    SET_ARCHIVE(state, reqs) {
      let archived_backlog = state.reqs['backlog'].filter(req => req.archived)
      let archived_pending = state.reqs['pending'].filter(req => req.archived)
      let archived_ongoing = state.reqs['ongoing'].filter(req => req.archived)
      let archived_done = state.reqs['done'].filter(req => req.archived)
      let archived_delivered = state.reqs['delivered'].filter(req => req.archived)
      state.reqs_archived = archived_backlog.concat(archived_pending, archived_ongoing, archived_done, archived_delivered)
    },
    SET_ANALYSIS(state, reqs) {
      let analysis_backlog = state.reqs['backlog'].filter(req => req.analysis)
      let analysis_pending = state.reqs['pending'].filter(req => req.analysis)
      let analysis_ongoing = state.reqs['ongoing'].filter(req => req.analysis)
      let analysis_done = state.reqs['done'].filter(req => req.done.analysis)
      let analysis_delivered = state.reqs['delivered'].filter(req => req.analysis)
      state.reqs_analysis = analysis_backlog.concat(analysis_pending, analysis_ongoing, analysis_done, analysis_delivered)
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
    reqs_archived (state) {
      return state.reqs_archived
    },
    reqs_analysis (state) {
      return state.reqs_analysis
    },
    reqs_board (state) {
      return state.reqs_board
    }
  },
  actions: {
    fetchReqs(store) {
      return AppApi.list_reqs().then(R => {
          store.commit('SET_REQS_BOARD', R.data)
          store.commit('SET_ARCHIVE', R.data)
          store.commit('SET_ANALYSIS', R.data)
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