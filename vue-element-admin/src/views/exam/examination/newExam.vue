<template>
  <div class="newExam">
    <div class="head">创建试卷</div>
    <div class="bigBox">
      <el-row class="add">
        <el-button>添加新题</el-button>
      </el-row>
      <div class="style_exam">
        <h2>{{CreateExamDataFunState.title}}</h2>
        <p class="top">考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
        <div class="style_questionitem" v-for="(item,index) in this.createDate" :key="index">
          <div class="style_questionitem__3ETlC">
            <h4>
              "1"
              <a href="javascript:;" @click="handleDel(index)">删除</a>
            </h4>
            <div class="react-markdown">
              <p>{{item.title}}</p>
              <p></p>
              <p>示例 1:</p>
              <pre>
                  <code>
                    {{item.questions_stem}}
                  </code>
              </pre>
              <p>示例 2:</p>
              <pre>
                  <code>
                    {{item.questions_answer}}
                  </code>
              </pre>
              <p></p>
              <p>
                {{item.questions_type_text}}
                <br>
              </p>
              <p>{{item.questions_answer}}</p>
            </div>
          </div>
        </div>
        <button @click="handleClick">创建试卷</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      createDate: [],
      obj: "",
      examID:""
    };
  },
  computed: {
    ...mapState({
      CreateExamState: state => { //创建试卷
        return state.examination.CreateExamData;
      },
      CreateExamDataFunState: state => {
        return state.examination.CreateExamDataFun;
      },
      UpdateExamState: state => { //更新试卷
        return state.examination.UpdateExamData;
      }
    })
  },
  mounted() {
    //存入本地
    this.createDate = JSON.parse(window.localStorage.getItem("CreateExam"));
  },
  methods: {
    ...mapMutations({
      CreateExamSave: "examination/getCreateExam",
      CreateExamFunSave: "examination/getCreateExamFun",
      UpdateExamSave: "examination/getUpdateExam"
    }),
    ...mapActions({
      CreateExam: "examination/CreateExam",//创建试卷
      UpdateExam: "examination/UpdateExam", //更新试卷
      AllExam: "examination/AllExam"      
    }),
    //点击删除
    handleDel(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.createDate.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick() {
      //获取exam_exam_id的ID
      this.examID = this.CreateExamState.exam_exam_id
      //获取questions的ID
      this.CreateExamState.questions.map(item => {
        this.obj = item.questions_id;
        return this.obj;
      });
      //更新试卷：传入参数
      this.UpdateExam({
        question_ids:{
           question_ids:JSON.stringify(this.obj)
        },
        examID:this.examID
      });
      this.AllExam()
      this.$router.push({ path: "/examination/minationlist" })
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.examination {
  width: 100%;
  background: #eee;
}

.head {
  height: 80px;
  padding: 25px;
  box-sizing: border-box;
  font-size: 26px;
}

.bigBox {
  width: 96%;
  background: #fff;
  margin: 0 auto;
  border-radius: 15px;
  .add {
    padding: 20px;
  }
  .style_exam {
    min-height: 980px;
    margin: auto;
    padding: 80px;
    padding-top: 40px;
    text-align: center;
    position: relative;
    h2 {
      margin-top: 0;
      margin-bottom: 0.5em;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
    }
    .top {
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    .style_questionitem {
      border: solid 1px #ccc;
      padding: 0 20px;
      margin-top: 30px;

      .style_questionitem__3ETlC {
        h4 {
          margin-block-start: 1.33em;
          margin-block-end: 1.33em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          display: flex;
          justify-content: space-between;
          a {
            color: #1890ff;
            background-color: initial;
            text-decoration: none;
            outline: none;
            cursor: pointer;
            transition: color 0.3s;
          }
        }
      }
    }
    button {
      margin-top: 20px;
      padding: 10px 40px !important;
      border-radius: 4px !important;
      border: 0 !important;
      font-size: 14px !important;
      color: #fff !important;
      background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
      span {
        pointer-events: none;
        display: inline-block;
      }
    }
  }
}
</style>
