import {addClass,upDateNewClass,upDateClass,getAllRoom,getAllSubject,updateClasses,deleteClass} from '@/api/class/classManage.js'

const state = {
    classData:[],
    allRoom:[],
    allSubject:[],
    dialogFormVisible:false,
    editData:{},
    type:'',
    disable:false,
    gradeID:''
}

const mutations={
   updateState(state,payload){
        for(let key in payload){
            state[key] = payload[key];
        }
   },
   //dialog显示隐藏
   dialogForm(state,payload){
       state.type = payload.type
       state.disable = payload.disable
       state.dialogFormVisible = payload.dialogFormVisible
       state.gradeID = payload.gradeID
   },
   //修改
   editClass(state,payload){
      state.editData = payload
   }
}

const actions = {
    //班级列表
    async curUpDateClass({commit},payload){ 
      //所有班级列表
      let res = await upDateClass()
      //所有未分配教室的班级
      let nores = await upDateNewClass()
      if(res.code == 1 || nores.code == 1){
        commit('updateState',{classData:[...res.data,...nores.data]})
      }
    },
    //添加班级
    async curAddClass({commit},payload){ 
        let res = await addClass(payload)
        if(!res){
            console.log('班级名重复！！！')
        }
    },
    //更新班级
    async curUpdateClasses({commit},payload){
        let res = await updateClasses(payload)

    },
    //删除班级
    async curDeleteClass({commit},payload){
        await deleteClass(payload)
    },
    //获取所有教室
    async getCurAllRoom({commit},payload){
        let res = await getAllRoom()
        if(res.code == 1){
            commit('updateState',{allRoom:res.data})
        }
    },
    //获取所有科目
    async getCurAllSubject({commit},payload){
        let res = await getAllSubject()
        if(res.code == 1){
            commit('updateState',{allSubject:res.data})
        }
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
