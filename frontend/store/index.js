import Vuex from 'vuex'
import AppApi from '~apijs'

const store = () => new Vuex.Store({

  state: {
    logged_user: undefined,
    snack: {},
    reqs_board: {},
    reqs_analysis: {},
    reqs_archived: {},
    filtered_board: {},
    search: '',
    page: ''
  },
  mutations: {
    SET_PAGE(state, actual_page) {
      state.page = actual_page
    },
    SET_LOGGED_USER(state, logged_user) {
      state.logged_user = logged_user
    },
    SET_SNACK_STATE(state, newstate) {
      state.snack = newstate
    },
    SET_REQS_BOARD(state, reqs) {
      function compare( a, b ) {
        if ( a.index < b.index ){
          return -1;
        }
        if ( a.index > b.index ){
          return 1;
        }
        return 0;
      }
      let board_backlog = reqs['backlog'].filter(req => !req.archived && !req.analysis)
      board_backlog.sort(compare);
      let board_pending = reqs['pending'].filter(req => !req.archived && !req.analysis)
      board_pending.sort(compare);
      let board_ongoing = reqs['ongoing'].filter(req => !req.archived && !req.analysis)
      board_ongoing.sort(compare);
      let board_done = reqs['done'].filter(req => !req.archived && !req.analysis)
      board_done.sort(compare);
      let board_delivered = reqs['delivered'].filter(req => !req.archived && !req.analysis)
      board_delivered.sort(compare);
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
      state.reqs_analysis = state.reqs_analysis.filter(r => r.id !== id)
    },
    DELETE_REQ(state, params) {
      let id = params.id
      let req = state.reqs_analysis.filter(r => r.id === id)[0]
      req.is_trash = true
      state.reqs_analysis = state.reqs_analysis.filter(r => r.id !== id)
    },
    UPDATE_REQ_STATUS(state, params) {
      let status = params.status
      let id = params.id
      let req = state.reqs_board[status].filter(r => r.id===id)[0]
      req.status = status
    },
    UPDATE_REQ_INDEX(state, params) {
      let index = params.index
      let id = params.id
      let status = params.status
      let req = state.reqs_board[status].filter(r => r.id===id)[0]
      if (req !== undefined) {
        req.index = index
      }
    },
    UPDATE_REQ(state, params) {
      let id = params.id
      let status = params.status
      let prop = params.prop
      let value = params.value
      let type = params.type
      if(type === 'board') {
        let req = state.reqs_board[status].filter(r => r.id===id)[0]
        req[prop] = value
      }
      else if(type === 'archived') {
        let req = state.reqs_archived.filter(r => r.id===id)[0]
        req[prop] = value
      }
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
    },
    search (state) {
      return state.search
    },
    page (state) {
      return state.page
    }
},
  actions: {
    fetchReqs(store) {
      return AppApi.list_reqs().then(R => {
          store.commit('SET_REQS_BOARD', R.data)
          store.commit('SET_ARCHIVE', R.data)
          store.commit('SET_ANALYSIS', R.data)
          let statuses = ['backlog','pending','ongoing','done','delivered']
          for (let j = 0; j < statuses.length; j++) {
            let status = statuses[j]
            let list = store.state.reqs_board[status]
            for (let i = 0; i < list.length; i++) {
              let id = list[i].id
              let index = i 
              return AppApi.update_req_index(id, index).then(R => {
                store.commit('UPDATE_REQ_INDEX', R.data)
              })
            }
          }
      })
    },
    addReq(store, status, title='Card novo', archived='f', analysis='f', is_trash='f', team='-', priority=3, category='-', link='-', description='Sem descrição') {
      return AppApi.create_req_app(status.status, title, archived, analysis, is_trash, team, priority, category, link, description).then(R => {
        store.commit('ADD_REQ', R.data)
      })
    },
    archiveReq(store, params) {
      let id = params.id
      return AppApi.archive_req(id).then(R => {
          store.commit('ARCHIVE_REQ', R.data)
      })
    },
    unarchiveReq(store, params) {
      let id = params.id
      return AppApi.unarchive_req(id).then(R => {
          store.commit('UNARCHIVE_REQ', R.data)
      })
    },
    analyzeReq(store, params) {
      let id = params.id
      return AppApi.analyze_req(id).then(R => {
          store.commit('ANALYZE_REQ', R.data)
      })
    },
    deleteReq(store, params) {
      let id = params.id
      return AppApi.delete_req(id).then(R => {
          store.commit('DELETE_REQ', R.data)
      })
    },
    updateListIndex(store, params) {
      let list = store.state.reqs_board[params.list]
      for (let j = 0; j<list.length; j++) {
        let req = list[j]
        AppApi.update_req_index(req.id, j).then(R => {
            store.commit('UPDATE_REQ_INDEX', R.data)
          })
        }
      },
    updateListStatus(store, params) {
      let status = params.list
      let list = store.state.reqs_board[status]
      for (let j = 0; j<list.length; j++) {
        let req = list[j]
        AppApi.update_req_status(req.id, status).then(R => {
            store.commit('UPDATE_REQ_STATUS', R.data)
          })
        }
      },
    updateReqStatus(store, params) {
      let status = params.list
      let id = params.id
      AppApi.update_req_status(id, status).then(R => {
          store.commit('UPDATE_REQ_STATUS', R.data)
        })
      },
    updateReq(store, params) {
      let id = params.id
      let value = params.input
      let prop = params.prop
      return AppApi.update_req_prop(id, prop, value).then(R => {
        store.commit('UPDATE_REQ', R.data)
      })
    },
  },
})

export default store