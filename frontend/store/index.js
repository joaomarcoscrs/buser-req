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
      let archived_backlog = reqs['backlog'].filter(req => req.archived)
      let archived_pending = reqs['pending'].filter(req => req.archived)
      let archived_ongoing = reqs['ongoing'].filter(req => req.archived)
      let archived_done = reqs['done'].filter(req => req.archived)
      let archived_delivered = reqs['delivered'].filter(req => req.archived)
      state.reqs_archived = archived_backlog.concat(archived_pending, archived_ongoing, archived_done, archived_delivered)
    },
    SET_ANALYSIS(state, reqs) {
      let analysis_backlog = reqs['backlog'].filter(req => req.analysis)
      let analysis_pending = reqs['pending'].filter(req => req.analysis)
      let analysis_ongoing = reqs['ongoing'].filter(req => req.analysis)
      let analysis_done = reqs['done'].filter(req => req.analysis)
      let analysis_delivered = reqs['delivered'].filter(req => req.analysis)
      state.reqs_analysis = analysis_backlog.concat(analysis_pending, analysis_ongoing, analysis_done, analysis_delivered)
    },
    ADD_REQ(state, req) {
      state.reqs_board[req.status].push({
         id: req.id,
         index: req.index,
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
    ARCHIVE_REQ(state, params) {
      let status = params.status
      let id = params.id
      let req = state.reqs_board[status].filter(r => r.id===id)[0]
      req.archived = true
      state.reqs_archived.push(req)
      state.reqs_board[status] = state.reqs_board[status].filter(r => r.id !== id)
    },
    UNARCHIVE_REQ(state, params) {
      let id = params.id
      let req = state.reqs_archived.filter(r => r.id === id)[0]
      req.archived = false
      if (req.status === null || req.status === '') {
        req.status = 'backlog'
      }
      state.reqs_board[req.status].push(req)
      state.reqs_archived = state.reqs_archived.filter(r => r.id !== id)
    },
    ANALYZE_REQ(state, params) {
      let id = params.id
      let req = state.reqs_analysis.filter(r => r.id === id)[0]
      req.analysis = false
      req.status = 'backlog'
      state.reqs_board.backlog.push(req)
    },
    DELETE_REQ(state, params) {
      let id = params.id
      let req = state.reqs_analysis.filter(r => r.id === id)[0]
      req.is_trash = true
      state.reqs_analysis = state.reqs_analysis.filter(r => r.id !== id)
    },
    CHANGE_REQ_STATUS(state, params) {
      let status = params.status
      let id = params.id
      let req = state.reqs_board[status].filter(r => r.id===id)[0]
      req.status = status
    },
    UPDATE_REQ_INDEX(state, params) {
      let index = params.index
      let id = params.id
      let req = state.reqs_board[req.status].filter(r => r.id===id)[0]
      req.index = index
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
      id = id.id
      return AppApi.archive_req(id).then(R => {
          store.commit('ARCHIVE_REQ', R.data)
      })
    },
    unarchiveReq(store, id) {
      id = id.id
      return AppApi.unarchive_req(id).then(R => {
          store.commit('UNARCHIVE_REQ', R.data)
      })
    },
    analyzeReq(store, id) {
      id = id.id
      return AppApi.analyze_req(id).then(R => {
          store.commit('ANALYZE_REQ', R.data)
      })
    },
    deleteReq(store, id) {
      id = id.id
      return AppApi.delete_req(id).then(R => {
          store.commit('DELETE_REQ', R.data)
      })
    },
    moveReq(store, id, new_status) {
      return AppApi.change_status(id, new_status).then(R => {
        store.commit('CHANGE_REQ_STATUS', R.data)
      })
    },
    updateListIndex(store, list) {
      list = list.list
      for (req in list) {
        let index_certo = state.reqs_board[list].indexOf(req)
        if (req.index !== index_certo) {
          return AppApi.update_req_index(req.id, index).then(R => {
            store.commit('UPDATE_REQ_INDEX', R.data)
          })
        }
      }
    }
  }
})

export default store