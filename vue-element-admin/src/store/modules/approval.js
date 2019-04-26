import {grade} from '@/api/approval.js'
const state={
    view_list:[]
}
const mutations={
    updata(state,payload){
        for(var i in payload){
            state[i] = payload[i]
        }
    }
}
const actions={
    async grades({commit}){
        let result = await grade();
        commit('updata',{view_list:result})
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
