
import {upDateStudent,upDateNewStudent,deleteStudent} from '@/api/class/student.js'

const state = {
  studentData:[],
  pageNum:20,
  currentPage:1,
  searchData:{}
}

const mutations={
    updateState(state,payload){
        for(let key in payload){
            state[key] = payload[key];
        }
   },
   //分页器数据,搜索
   pageData(state,payload){
     state.studentData = payload
   },
   //获取页数，当前页
   updatePage(state,payload){0
      state.pageNum = payload.pageSize
      state.currentPage = payload.currentPage
   },
   //搜索
   getSearch(state,payload){
    state.searchData = payload
   }

}

const actions = {
    //所有学生列表
    async curUpDateStudent({commit,state},payload){ 
        //所有学生列表
        let res = await upDateStudent()
        //获取所有未分配班级的学生
        let nores = await upDateNewStudent()
        if(res.code == 1 || nores.code == 1){
          commit('updateState',{studentData:[...res.data,...nores.data]})
        }
        
        return state.studentData;
    },
  //删除
  async curDeleteStudent({commit},payload){
    await deleteStudent(payload)
  }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
