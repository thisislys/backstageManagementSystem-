<template>
    <div class="classMan">
        <p>班级管理</p>
        <div class="classContent">
            <el-button type="primary" @click="dialogVisible('add')">+ 添加班级</el-button>
            <classDialog></classDialog>
            <classList :classData="classData"></classList>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import classList from './components/classList.vue';
import classDialog from './components/classDialog.vue';
export default {
     data() {
        return {
          
        }
   },
   components:{
     classList,
     classDialog
   },
   async mounted(){
     await this.curUpDateClass()
    
   },
   computed:{
     ...mapState({
        classData:state => state.classManage.classData,
        dialogFormVisible:state => state.classManage.dialogFormVisible
     })
   },
   created(){

   },
   methods: {
     ...mapMutations({
        updateState:'classManage/updateState',
        dialogForm:'classManage/dialogForm'
     }),
     ...mapActions({
       curUpDateClass:'classManage/curUpDateClass',
       addClass:'classManage/addClass'
     }),
     //添加班级
    dialogVisible(type){
        if(type == 'add'){
          this.dialogForm({
            dialogFormVisible:true,
            type:type
          })
        }
         
      }
    }
   }
</script>

<style lang="scss" scoped>
    .dialog-footer{
        text-align: center;
        .submit{
             width: 20%;
             background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
        }
    }
   .el-dialog__header{
    color: rgba(0, 0, 0, 0.65);
    border-bottom: 1px solid #e8e8e8;
    .el-dialog__title{
      font-size: 16px;
    }
   }
   .classContent{
       width:100%;
       height:auto;
       background:#FFF;
       border-radius: 10px;
       padding:20px;
       box-sizing:border-box;
       
   }
   
</style>