import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            name: '',
            uid: '',
        },
        note: {
            ID: '',
            activeRow: '',
            activePage: 'out',
            activeComp: 'table',
        }

    },
    mutations: {
        SET_USER(state, payload){
            state.user = payload
        },
        DEL_USER(state){
            state.user = {
                name: null,
                uid: null,
            }
        },

        resetNote(state){
            state.note = {
                ID: '',
                activeRow: '',
                activePage: 'out',
                activeComp: 'table',
            }
        },
    },
    actions: {
        setUser(state, payload){
            state.commit('SET_USER', payload)
        },
        delUser(state){
            state.commit('DEL_USER')
        },
    },
    modules: {
    },
    getters: {
      getUser(state){
          return state.user
      },
      getNote(state){
        return state.note
    }
  }
})
