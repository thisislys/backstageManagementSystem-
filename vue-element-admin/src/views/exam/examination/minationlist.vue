<template>
  <div class="minWraper">
    <p>试卷列表</p>
    <div class="top">
      <div class="examType">
        <span>考试类型:</span>
        <el-select v-model="classtypeValue" @change="handleChange" style="width:55%">
          <el-option
            v-for="item in ClassTypeState"
            :key="item.exam_id"
            :label="item.exam_name"
            :value="item.exam_name"
          ></el-option>
        </el-select>
      </div>

      <div class="classType">
        <span>课程:</span>
        <el-select v-model="subjectValue" @change="handleSub" style="width:55%">
          <el-option
            v-for="item in SubjectState"
            :key="item.subject_id"
            :label="item.subject_text"
            :value="item.subject_text"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="el-icon-search" class="search" @click="searchFilter">查询</el-button>
      <el-button type="primary" class="search" @click="exportExcel">导出试卷</el-button>
    </div>

    <div class="content">
      <div class="ctop">
        <h4>试卷列表</h4>
        <div>
          <el-button plain class="active">全部</el-button>
          <el-button plain class="active">进行中</el-button>
          <el-button plain class="active">已结束</el-button>
        </div>
      </div>

      <div class="center">
        <el-table :data="AllExamState" style="width: 100%">
          <el-table-column prop="title" label="试卷信息"></el-table-column>
          <el-table-column :data="AllExamState.grade_name" prop="grade_name" label="班级"></el-table-column>
          <el-table-column prop="user_name" label="创建人"></el-table-column>
          <el-table-column prop="start_time" label="开始时间"></el-table-column>
          <el-table-column prop="end_time" label="结束时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
               <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      classtypeValue: "",
      subjectValue: "",
      examID: "",
      selectData: "",
      classTypeFilter: [],
      subjectFilter:[]
    };
  },
  computed: {
    ...mapState({
      ClassTypeState: state => {
        return state.examination.ClassTypeData;
      },
      SubjectState: state => {
        return state.examination.SubjectData;
      },
      AllExamState: state => {
        return state.examination.AllExamData;
      },
      DetailExamState: state => {
        return state.examination.DetailExamData;
      },
      CreateExamState: state => {
        //创建试卷
        return state.examination.CreateExamData;
      }
    })
  },
  methods: {
    ...mapMutations({
      ClassTypeSave: "examination/getClassType",
      SubjectSave: "examination/getSubject",
      AllExamSave: "examination/getAllExam",
      DetailExamSave: "examination/getDetailExam",
      CreateExamSave: "examination/getCreateExam"
    }),
    ...mapActions({
      CreateExam: "examination/CreateExam",
      ClassType: "examination/ClassType",
      Subject: "examination/Subject",
      AllExam: "examination/AllExam",
      DetailExam: "examination/DetailExam"
    }),
    handleChange(e) {
      this.classtypeValue = e;
    },
    handleSub(e) {
      this.subjectValue = e;
    },
    searchFilter(){

    },
    handleDetail(row) {
      //获取exam_exam_id的ID
      this.DetailExam({
        examID: row.exam_exam_id
      });
      window.localStorage.setItem("examID", JSON.stringify(row.exam_exam_id));
      this.$router.push({ path: "/examination/detail" });
    },
    // 导出试卷列表
    exportExcel(){
      let header = Object.keys(this.AllExamState[0]);
      let list = this.AllExamState.map(item=>{
        let arr = Object.values(item);
        return arr.map(item=>JSON.stringify(item))
      })
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: list,
          filename: '',
          bookType: 'xlsx'  //excel后缀，xlsx,csv,xls
        })
      })
    }
  },
  created() {
    this.ClassType();
    this.Subject();
    this.AllExam();
  }
};
</script>

<style lang="scss" scoped>
.minWraper {
  width: 100%;
  height: 800px;
  background: #eee;
  > p {
    font-size: 22px;
  }
}

.top {
  height: 15%;
  background: #fff;
  border-radius: 15px;
  display: flex;
  .examType {
    margin-top: 2.4%;
    margin-left: 2%;
  }

  .classType {
    margin-top: 2.4%;
    margin-left: 2%;
  }

  .search {
    width: 120px;
    height: 32px;
    margin-top: 40px;
    background: #0139fd;
  }
}

.content {
  background: rgb(255, 255, 255);
  padding: 24px;
  margin: 20px 0px 20px;
  border-radius: 10px;
  h4 {
    margin-top: 10px;
  }
  .ctop {
    display: flex;
    justify-content: space-between;
    .active {
      color: #409eff;
    }
  }
}
</style>