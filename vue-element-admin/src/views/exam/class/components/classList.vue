<template>
  <div>
    <el-table
    :data="classData"
    style="width: 100%">
     <el-table-column
        prop="grade_name"
        label="班级名">
     </el-table-column>
     <el-table-column
        prop="subject_text"
        label="课程名">
     </el-table-column>
     <el-table-column
        prop="room_text"
        label="教室号">
     </el-table-column>
     <el-table-column
        fixed="right"
        label="操作"
        style="colo:#000">
     <template slot-scope="scope">
        <el-button type="text" size="small" style="color:#0139FD" @click="dialogVisible(scope.row,'edit')">修改</el-button>
        <el-button type="text" size="small" style="color:#0139FD" @click="curDelete(scope.$index, scope.row)">删除</el-button>
     </template>
     </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex';
export default {
  name: 'classList',
  data(){
     return {
      
     }
  },
  props: {
    classData:{
        type: Array,
        default() {
            return []
        }
    }
  },
  computed:{
    
  },
  methods: {
    ...mapMutations({
      dialogForm:'classManage/dialogForm',
      editClass:'classManage/editClass',
      updateState:'classManage/updateState'
    }),
    ...mapActions({
      curDeleteClass:'classManage/curDeleteClass',
      curUpDateClass:'classManage/curUpDateClass',
      curAddClass:'classManage/curAddClass'
    }),
   //点击修改
   dialogVisible(row,type){
         this.dialogForm({
            dialogFormVisible:true,
            type:type,
            disable:true,
            gradeID:row.grade_id 
         })  
         this.editClass(row)
         this.curAddClass(row)
   },
    //删除班级
   curDelete(index,row){
       this.curDeleteClass({
          grade_id:row.grade_id
       })
       this.curUpDateClass()
    }
  }
}
</script>

<style lang="scss">
   .el-table{
       margin-top: 15px;
      
   }
  .el-table thead{
       color: #000;
       font-weight: 200;
   }
</style>
