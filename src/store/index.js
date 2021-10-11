import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            name: '',
            uid: '',
        },
        note: {
            activeRow: ''
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
        SET_NOTE(state, payload){
            state.note = payload
        },
        DEL_NOTE(state){
            state.note = {
                activeRow: null,
            }
        }
    },
    actions: {
        setUser(state, payload){
            state.commit('SET_USER', payload)
        },
        delUser(state){
            state.commit('DEL_USER')
        },
        setNote(state, payload){
            state.commit('SET_NOTE', payload)
        },
        delNote(state){
            state.commit('DEL_NOTE')
        }
        
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
