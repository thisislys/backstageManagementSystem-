
import {addRoom,deleteRoom,updateRooms} from '@/api/class/roomManage.js'

const state = {
  dialogFormVisible:false
}

const mutations={
   //deleteDialog显示隐藏
   dialogForm(state,payload){
    state.dialogFormVisible = payload.dialogFormVisible
  }
}

const actions = {
   //添加教室
   async curAddRoom({commit},payload){ 
    let res = await addRoom(payload)
    if(res.room_id){
      //更新教室
      await updateRooms({
        room_text:payload.room_text,
        room_id:res.room_id
    })
    }else{
      console.log('班级重复')
    }
    
  },
  //删除
  async curDeleteRoom({commit},payload){
    await deleteRoom(payload)
 },
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
