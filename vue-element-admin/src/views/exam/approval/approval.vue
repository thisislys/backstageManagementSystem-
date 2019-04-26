<template>
    <div class="classMan">
        <p>待批班级</p>
        <div class="classContent">
            <el-table
            :data="view_list.data"
            style="width: 100%">
            <el-table-column
            prop="grade_name"
            label="班级名">
            </el-table-column>
            <el-table-column
            prop="subject_text"
            label="课程名称">
            </el-table-column>
            <el-table-column
            prop=""
            label="阅卷状态">
            </el-table-column>
            <el-table-column
            prop="subject_text"
            label="课程名称">
            </el-table-column>
            <el-table-column
            prop="room_text"
            label="成材率">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            style="colo:#000">
            <template slot-scope="scope">
                <el-button type="text" size="small" style="color:#0139FD" @click='correct'>批卷</el-button>
            </template>
            </el-table-column>
           </el-table>
           <div class="block">
                <el-pagination
                :page-sizes="[5, 10, 20, 50,100]"
                :page-size="10"
                layout=" prev, pager, next,sizes,jumper"
                :total="1"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
   export default {
   computed: {
     ...mapState({
       view_list:state=>state.approval.view_list
     })
   },
   async created(){
     await this.grade();
   },
   methods: {
      ...mapActions({
          grade:'approval/grades'
      }),
      correct(){
        this.$router.push({path:'/approval/app_detail'})
      }
    }
   }
</script>

<style lang="scss" scoped>
     .el-pagination{
       text-align: right;
       margin-top: 10px;
        button.btn-prev{
          border: 1px solid #CCC!important;
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
   .el-table{
       margin-top: 3%;
      
   }
  .el-table thead{
       color: #000;
       font-weight: 200;
   }
</style>