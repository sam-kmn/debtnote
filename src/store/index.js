import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            name: '',
            uid: '',
        }
    },
    mutations: {
        SET_USER(state, payload){
            state.user = payload
        },
        DEL_USER(state){
            state.user = {
                name: '',
                uid: '',
            }
        }
    },
    actions: {
        setUser(state, payload){
            state.commit('SET_USER', payload)
        },
        delUser(state){
            state.commit('DEL_USER')
        }
        
    },
    modules: {
    },
    getters: {
      getUser(state){
          return state.user
      }
  }
})
