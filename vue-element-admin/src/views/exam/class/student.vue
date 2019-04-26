<template>
    <div class="classMan">
        <p>学生管理</p>
        <div class="classContent">
            <div class="form">
                <el-form :model="form" ref="form" label-width="80px">
                  <el-input style="width:175px" v-model="form.name" placeholder="输入学生姓名"></el-input>
                  <el-select placeholder="请选择教室号" style="margin-left:10px" v-model="form.room" @change="getRoom">
                   <el-option v-for="(item,ind) in allRoom" :key="ind" :label="item.room_text" :value="item.room_text"></el-option>
                  </el-select>
                  <el-select placeholder="班级名" style="margin-left:10px" v-model="form.class" @change="getClass">
                      <el-option v-for="(item,ind) in classData" :key="ind" :label="item.grade_name" :value="item.grade_name"></el-option>
                  </el-select>
                  <el-button type="primary" @click="curSearch">搜索</el-button>
                  <el-button type="primary" @click="resetForm('form')">重置</el-button>
              </el-form>
            </div>
            <studentList></studentList>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex';
import studentList from './components/studentList.vue';
export default {
    data() {
        return {
            data:[],
            form: {
              name: '',
              room: '',
              class: ''
            },
            currentPages:1,
            pageSizes:[5, 10, 20, 50,100],
            pageSize:20
        }
   },
   components:{
     studentList
   },
   computed:{
     ...mapState({
       allRoom:state => state.classManage.allRoom,
       classData:state => state.classManage.classData
      })
   },
   
   mounted(){
    this.getPage()
    this.getCurAllRoom() 
    this.curUpDateClass() 
   },
    methods:{
     ...mapMutations({
       updatePage:'student/updatePage',
       pageData:'student/pageData'
     }),
     ...mapActions({
      curUpDateStudent:'student/curUpDateStudent',
      getCurAllRoom:'classManage/getCurAllRoom',
      curUpDateClass:'classManage/curUpDateClass'
     }),
    getRoom(e){
       this.form.room = e ;
    },
    getClass(e){
       this.form.class = e ;
    },
    getNewData(newData){
       if(newData){
          this.pageData(newData)
        }else{
          return;
       }
    },
    async curSearch(){
        if(this.form.name && this.form.room && this.form.class){
            let res = await this.curUpDateStudent()
            let newData = res.filter(val=>{
              return val.student_name == this.form.name && val.room_text == this.form.room && val.grade_name == this.form.class
            })
            this.getNewData(newData)
        }else if(!this.form.name && !this.form.room && !this.form.class){
            this.getPage()
        }else if((this.form.name && this.form.room)||(this.form.name && this.form.class)||(this.form.room && this.form.class)){
            let res = await this.curUpDateStudent()
            let newData = res.filter(val=>{
              return (val.student_name == this.form.name && val.room_text == this.form.room) || (val.student_name == this.form.name && val.grade_name == this.form.class) || (val.room_text == this.form.room && val.grade_name == this.form.class)
            })
            this.getNewData(newData)
        }else {
          let res = await this.curUpDateStudent()
          let newData = res.filter(val=>{
              return val.student_name == this.form.name || val.room_text == this.form.room || val.grade_name == this.form.class
          })
            this.getNewData(newData)
        }  
    },
    async getPage(){
        this.updatePage({
          pageSize:this.pageSize,
          currentPage:this.currentPages
        })
        let res = await this.curUpDateStudent()
        this.data = res.slice((this.currentPages-1) * this.pageSize,this.currentPages * this.pageSize)
        this.pageData(this.data)
    },
    classValue(){
      this.form.name = '';
      this.form.room = '';
      this.form.class = '';
    },
    resetForm(formName) {
      this.$refs[formName].resetFields(); //移除校验结果并重置字段值
      this.classValue()
    }
   }
  }
</script>

<style lang="scss" scoped>
   .form{
       .el-button{
        width: 10%;
        height: 32px;
        background: linear-gradient(-90deg,#4e75ff,#0139fd)!important;
        margin-left:10px;
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
   .el-table header{
       color: #000;
       font-weight: 400;
       background: #F0F2F5!important;
       margin-top: 20px;
   }
</style>