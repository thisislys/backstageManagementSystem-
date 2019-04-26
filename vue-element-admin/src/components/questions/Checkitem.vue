<template>
  <div>
    <div class="header">
      <ul class="name_list">
        <span>课程类型:</span>
        <li v-for='(item,index) in subject' :key='index' @click='subject_id(item)'>{{item.subject_text}}</li>
      </ul>
      <ul class="select">
        <li>
          <span>考试类型:</span>
          <el-select v-model="exam_id" placeholder="请选择" @change='Type'>
            <el-option v-for="(item,index) in examType" :key="index" :label="item.exam_name" :value="item.exam_id">
            </el-option>
          </el-select>
        </li>
        <li class="styles">
          <span>题目类型:</span>
          <el-select v-model="questions_type_id" placeholder="请选择" @change='Questions'>
            <el-option v-for="(item,index) in QuestionsType" :key="index" :label="item.questions_type_text" :value="item.questions_type_id">
            </el-option>
          </el-select>
        </li>
        <li class="styles">
          <el-button type="text" class="addbtn" @click='submit'>查询</el-button>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="content_list" v-for='(item,index) in questionsa' :key='index'>
        <div class="con_list_left" @click='detail(item)'>
          <span class="robot">{{item.title}}</span>
          <div class="tab_list">
            <span>{{item.questions_type_text}}</span>
            <span>{{item.subject_text}}</span>
            <span>{{item.exam_name}}</span>
          </div>
          <p class="name_issue">{{item.user_name}}</p>
        </div>
        <div class="con_list_right">
          <span @click='compile(item)'>编辑</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    data() {
      return {
        exam_id: '',
        subjectid: '',
        questions_type_id: '',
      }
    },
    computed: {
      ...mapState({
        examType: state => state.exam.examType,
        subject: state => state.exam.subject,
        QuestionsType: state => state.exam.getQuestionsType,
        questionsa: state => state.exam.questions
      })
    },
    created() {
      this.getitem();
      this.subjects();
      this.getQuestionsType();
      this.questions();
    },
    methods: {
      Questions(e) {
        this.questions_type_id = e;
      },
      Type(e) {
        this.exam_id = e;
      },
      ...mapActions({
        getitem: 'exam/getitems',
        subjects: 'exam/subjects',
        getQuestionsType: 'exam/getQuestionsType',
        questions: 'exam/questions',
        condition: 'exam/condition'
      }),
      subject_id(item) {
        this.subjectid = item.subject_id;
      },
      submit() {
        this.condition({
          subject_id: this.subjectid,
          exam_id: this.exam_id,
          questions_type_id: this.questions_type_id
        })
      },
      compile(item) {
        this.$router.push({ path: '/Additem/adds'})
        sessionStorage.setItem('questions_id',JSON.stringify(item.questions_id))
      },
      detail(item) {
        this.$router.push({ path: '/Additem/detail'})
        sessionStorage.setItem('questions_ids',JSON.stringify(item.questions_id))
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
        list-style: none;
    }
    .header {
        width: 100%;
        border-radius: 20px;
        background: #fff;
        padding: 30px 30px 30px 30px;
    }
    .content {
        width: 100%;
        border-radius: 20px;
        background: #fff;
        margin-top: 20px;
        padding: 30px 20px 30px 20px;
    }
    .name_list {
        display: flex;
        flex-wrap: wrap;
        height: 20px;
        li {
            padding: 0 12px 0 12px;
            font-size: 12px;
            line-height: 20px;
        }
        li:hover {
            color: #7B91E2;
        }
        span {
            font-size: 14px;
            line-height: 18px;
        }
    }
    .select {
        margin-top: 40px;
        display: flex;
        .styles {
            margin-left: 40px;
        }
        li{
            span{
                font-size:14px;
            }
        }
    }
    .addbtn {
        padding: 10px 40px 10px 40px;
        background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
        font-size: 14px;
        color: #fff;
    }
    .content {
        display: flex;
        flex-direction: column;
        .con_list_left {
            font-size: 14px;
            flex:1;
            .robot {
                color: #5959AF;
            }
            .tab_list {
                margin-top: 20px;
            }
            .tab_list span:nth-child(1) {
                padding: 5px;
                border: 1px solid #91D5FF;
                background: #E6F7FF;
                color: #91D5FF;
            }
            .tab_list span:nth-child(2) {
                padding: 5px;
                border: 1px solid #ADC6FF;
                background: #F0F5FF;
                color: #ADC6FF;
            }
            .tab_list span:nth-child(3) {
                padding: 5px;
                border: 1px solid #FFD591;
                background: #FFF7E6;
                color: #FFD591;
            }
        }
        .name_issue {
            color: #8439FD;
            margin-top: 20px;
        }
        .con_list_right {
            display: flex;
            align-items: center;
            color: #0139FD;
        }
    }
    .content_list {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid #ccc;
        padding-top: 15px;
        padding-bottom: 10px;
    }
    .content_list:hover {
        background: #F7F8FF;
    }
</style>