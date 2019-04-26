import {login} from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state={
}
const mutations={ 
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions={
    async login({commit},payload){
      let result=await login(payload);
      setToken(result.token)
      return result;
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
