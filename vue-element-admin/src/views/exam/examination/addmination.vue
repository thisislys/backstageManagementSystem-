<template>
  <div class="examination">
    <p>添加考试</p>
    <div class="Allbox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="试卷名称" prop="name" class="ExamName">
          <br>
          <el-input v-model="ruleForm.name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="选择试卷考试类型" prop="type" class="ExamName">
          <br>
          <el-select v-model="ruleForm.type" @change="handleChange" style="width:200px">
            <el-option
              v-for="item in ClassTypeState"
              :key="item.exam_id"
              :label="item.exam_name"
              :value="item.exam_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择课程" prop="region" class="ExamName">
          <br>
          <el-select v-model="ruleForm.region" @change="handleSub" style="width:200px">
            <el-option
              v-for="item in SubjectState"
              :key="item.subject_id"
              :label="item.subject_text"
              :value="item.subject_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设置题量" prop="Topic" class="ExamName">
          <br>
          <el-input-number
            v-model="ruleForm.Topic"
            controls-position="right"
            :min="1"
            :max="10"
            style="width:200px"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="考试时间" required class="ExamName datatime">
          <br>
          <el-col :span="6">
            <el-form-item prop="date1">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width:300px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="1">
            <el-form-item prop="date2">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.date2"
                style="width:300px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">创建试卷</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
var moment = require("moment");

export default {
  data() {
    return {
      num: "",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false
      },
      rules: {
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择考试类型", trigger: "blur" }],
        region: [{ required: true, message: "请选择课程", trigger: "blur" }],
        Topic: [{ required: true, message: "请选择题量", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      createExamParams: {},
      ClassTypeID: "",
      SubjectID: ""
    };
  },
  computed: {
    ...mapState({
      ClassTypeState: state => {
        return state.examination.ClassTypeData;
      },
      SubjectState: state => {
        return state.examination.SubjectData;
      }
    })
  },
  methods: {
    ...mapMutations({
      ClassTypeSave: "examination/getClassType",
      SubjectSave: "examination/getSubject",
      CreateExamSave: "examination/getCreateExam"
    }),
    ...mapActions({
      CreateExam: "examination/CreateExam",
      ClassType: "examination/ClassType",
      Subject: "examination/Subject"
    }),

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        var localstorage = window.localStorage;
        //转换为时间戳
        const dataTime1 = moment(this.ruleForm.date1).unix();
        const dataTime2 = moment(this.ruleForm.date2).unix();
        if (valid) {
          //传入接口参数
          let res = await this.CreateExam({
            subject_id: this.SubjectID,
            exam_id: this.ClassTypeID,
            title: this.ruleForm.name,
            number: this.ruleForm.Topic,
            start_time: dataTime1,
            end_time: dataTime2
          });

          // 本地存放提交成功的数据
          window.localStorage.setItem("CreateExam", JSON.stringify(res));
          this.$router.push({ path: "/examination/newExam" });
        } else {
          return false;
        }
      });
    },
    handleChange(e) {
      this.ClassTypeID = e;
    },
    handleSub(e) {
      this.SubjectID = e;
    }
  },
  created() {
    this.ClassType();
    this.Subject();
  }
};
</script>

<style lang="scss" scoped>
.examination {
  width: 100%;
  height: 800px;
  background: #eee;
  >p{
    font-size: 22px;
  }
}

.Allbox {
  width: 96%;
  height: 700px;
  background: #fff;
  margin: 0 auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  .demo-ruleForm {
    display: flex;
    flex-direction: column;
    .ExamName {
      margin-left: 40px;
      margin-top: 20px;
    }
    .btn {
      margin-left: 40px;
      margin-top: 20px;
    }
   
  }
}
</style>
  