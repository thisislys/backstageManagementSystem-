import {additem,getitem,subject,getQuestionsType,getuser,questions,condition,update,addtype} from '@/api/exam.js'
const state={
    examType:[],
    subject:[],
    getQuestionsType:[],
    getuser:{},
    questions:[]
}
const mutations={
    updata(state,payload){
        for(var i in payload){
            state[i] = payload[i]
        }
    }
}
const actions={
    //添加试题
    async additems({commit},payload){
      let result=await additem(payload);
    },
    //获取考试类型
    async getitems({commit},payload){
        let result = await getitem();
        commit('updata',{examType:result.data})
    },
    //获取所有课程
    async subjects({commit},payload){
        let result = await subject();
        commit('updata',{subject:result.data})
    },
    //获取所有试题
    async getQuestionsType({commit},payload){
        let result = await getQuestionsType();
        commit('updata',{getQuestionsType:result.data})
    },
    //获取当前用户信息
    async getuser({commit},payload){
        let result = await getuser();
        commit('updata',{getuser:result.data})
    },
    //获取所有试题
    async questions({commit},payload){
        let result = await questions();
        commit('updata',{questions:result.data})
    },
    //条件查询
    async condition({commit},payload){
        let result = await condition(payload);
        commit('updata',{questions:result.data})
    },
    //更新试题
    async update({commit},payload){
        let result = await update(payload);
    },
    //添加试题类型
    async addtype({commit},payload){
        let result = await addtype(payload);
    }

    //测试删除接口
    // async delete({commit},payload){
    //     console.log(payload,'dels')
    //     let result = await deletes(payload)
    //     console.log(result,'del')
    // }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
