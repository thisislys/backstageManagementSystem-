<template>
  <div>
    <el-dialog title="添加班级" :visible="dialogFormVisible" :before-close="handleDialogClose">
        <el-form  :model="editData" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="班级名:" prop="grade_name" ref="class">
                <el-input v-model="editData.grade_name" @input="getClass" placeholder="班级名" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="教室号:" prop="room_text" ref="room">
                <el-select v-model="editData.room_text" style="width:100%" placeholder="请选择教室名" @change="getRoomId">
                <el-option v-for="(item,ind) in allRoom" :key="ind" :label="item.room_text" :value="item.room_id" style="width:100%"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程号:" prop="subject_text" ref="subject">
                <el-select v-model="editData.subject_text" style="width:100%" placeholder="课程名" @change="getSubjectId">
                <el-option v-for="(item,ind) in allSubject" :key="ind" :label="item.subject_text" :value="item.subject_id" style="width:100%"></el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button class="submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
            </el-dialog>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
  name: 'classDialog',
  data(){
    return {
        subjectId:'',
        roomId:'',
        rules: {
          grade_name: [{ required: true, message: '请输入班级名', trigger: 'blur'}],
          room_text:[{ required: true, message: '请输入教室名', trigger: 'blur'}],
          subject_text:[{ required: true, message: '请输入课程号', trigger: 'blur'}]
         }
    }
  },
  computed:{
    ...mapState({
       allRoom:state => state.classManage.allRoom,
       allSubject:state => state.classManage.allSubject,
       dialogFormVisible:state => state.classManage.dialogFormVisible,
       editData:state => state.classManage.editData,
       type:state => state.classManage.type,
       disable:state => state.classManage.disable,
       gradeID:state => state.classManage.gradeID
    })
  },
  watch:{
    
  },
  created(){
  },
  mounted(){
    this.getCurAllRoom()
    this.getCurAllSubject()
  },
  methods: {
    ...mapMutations({
      dialogForm:'classManage/dialogForm',
      editClass:'classManage/editClass'
    }),
    ...mapActions({
      curAddClass:'classManage/curAddClass',
      getCurAllRoom:'classManage/getCurAllRoom',
      getCurAllSubject:'classManage/getCurAllSubject',
      curUpDateClass:'classManage/curUpDateClass',
      curUpdateClasses:'classManage/curUpdateClasses'
    }),
    getClass(e){
      this.editData.grade_name = e;
      this.$refs['class'].clearValidate()
    },
    clearData(){
      this.editClass({
        grade_id: "",
        grade_name:"",
        room_id:"",
        room_text:"",
        subject_id:"",
        subject_text:""
      }) 
    },
    handleDialogClose(){
      this.dialogForm({
         dialogFormVisible:false 
      }) 
      this.clearData()
      this.$refs['ruleForm'].clearValidate() 
    },
    getRoomId(e){
     if(e){
       this.roomId = e;
       this.$refs['room'].clearValidate()
     }
     
    },
    getSubjectId(e){
      if(e){
        this.subjectId = e;
        this.$refs['subject'].clearValidate()
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if(this.type == 'add'){
              await this.curAddClass({
                grade_name:this.editData.grade_name,
                room_id:this.roomId,
                subject_id:this.subjectId
              })  
              this.clearData()
            }else if(this.type == 'edit'){
              await this.curUpdateClasses({
                grade_id:this.gradeID,
                subject_id:this.subjectId,
                room_id:this.roomId
              })
            }
            await this.curUpDateClass()
            await this.dialogForm({
              dialogFormVisible:false  
            })  
            this.$refs[formName].clearValidate() 
            
            //alert('submit!');
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
   
</style>
