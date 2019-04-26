<template>
    <div class="classMan">
        <p>教室管理</p>
        <div class="classContent">
            <el-button type="primary" @click="dialogFormVis">+ 添加教室</el-button>
            <roomDialog></roomDialog>
            <el-table
            :data="allRoom"
            style="width: 100%">
            <el-table-column
                prop="room_text"
                label="教室号">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
             style="colo:#000">
            <template slot-scope="scope">
                <el-button type="text" size="small" style="color:#606266"  @click="centerDialog(scope.row)">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import roomDialog from './components/roomDialog.vue'
export default {
     data() {
        return {
         
        }
   },
   components:{
      roomDialog
   },
   mounted(){
    this.getCurAllRoom()
  },
   computed:{
    ...mapState({
       allRoom:state => state.classManage.allRoom
    })
   },
   methods: {
      ...mapMutations({
          dialogForm:'classroom/dialogForm'
      }),
      ...mapActions({
        getCurAllRoom:'classManage/getCurAllRoom',
        curDeleteRoom:'classRoom/curDeleteRoom'
      }),
      dialogFormVis(){
         this.dialogForm({
           dialogFormVisible:true
         })
      },
      centerDialog(row){
        this.$confirm('确定要删除此教室吗？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            this.curDeleteRoom({
                room_id:row.room_id
            })
            this.getCurAllRoom()
        })
     },
    }
   }
</script>

<style lang="scss" scoped>
    
    
  
</style>