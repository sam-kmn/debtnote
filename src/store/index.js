import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            name: '',
            uid: '',
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
    getters: {
      getUser(state){
          return state.user
      }
  }
})
