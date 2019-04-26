<template>
  <div>
    <el-dialog title="添加班级" :visible.sync="dialogFormVisible" width="40%" :before-close="handleDialogClose">
            <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="教室名:" ref="name" prop="name">
                    <el-input v-model="ruleForm.name" @input="getClass" placeholder="教室名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="handleDialogClose">取 消</el-button>
                <el-button class="submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
  name: 'roomDialog',
  data(){
    return {
        rules: {
          name: [
            { required: true,message: '请输入教室名',trigger:blur}
          ]
         },
        ruleForm: {
          name: ''
        }
    }
  },
  props:{
    
  },
  computed:{
    ...mapState({
       dialogFormVisible:state => state.classRoom.dialogFormVisible
    })
  },
  created(){
    
  },
  methods: {
    ...mapMutations({
      dialogForm:'classRoom/dialogForm'
      
    }),
    ...mapActions({
      getCurAllRoom:'classManage/getCurAllRoom',
      curAddRoom:'classRoom/curAddRoom'
    }),
    getClass(e){
      if(e){
        this.ruleForm.name = e;
        this.$refs['name'].clearValidate()
      }
    },
    handleDialogClose(){
      this.dialogForm({
         dialogFormVisible:false 
      }) 
      this.$refs['name'].clearValidate()
      this.ruleForm.name = ''
    },
    submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.curAddRoom({
              room_text:this.ruleForm.name
            })
            await this.dialogForm({
              dialogFormVisible:false 
            }) 
            await this.getCurAllRoom()
            this.$refs['name'].clearValidate()
            this.ruleForm.name = ''
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}
</script>

<style lang="scss">
   .dialog-footer{
        text-align: center;
        .submit{
             width: 20%;
             background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
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
   .el-table thead{
       color: #000;
       font-weight: 200;
   }
   .el-table{
       margin-top: 15px;
   }
</style>
