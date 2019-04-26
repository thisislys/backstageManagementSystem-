<template>
  <div>
    <el-button type="text" @click="open3" class="addbtn">+ 添加类型</el-button>
    <el-table :data="QuestionsType" style="width: 100%">
      <el-table-column prop="questions_type_id" label="类型ID"></el-table-column>
      <el-table-column prop="questions_type_text" label="类型名称"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      text:'',
      sort:0
    };
  },
  created() {
    this.getQuestionsType();
  },
  computed: {
    ...mapState({
      QuestionsType:state=>state.exam.getQuestionsType
    })
  },
  methods: {
    ...mapActions({
      getQuestionsType:'exam/getQuestionsType',
      addtype:'exam/addtype'
    }),
    open3() {
      this.sort = this.QuestionsType.length
        this.$prompt("创建新类型", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
      .then(async ({ value }) => {
        if(value){
          this.sort++
          await this.addtype({
            text:value,
            sort:this.sort
          })
          this.getQuestionsType();
        }else{
          alert('请添加类型名称 || Please add the type name')
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.addbtn {
  width: 158px;
  height: 40px;
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
  font-size: 14px;
  color: #fff;
  margin-bottom: 30px;
}

.el-message-box__message {
  font-size: 30px;
}

.el-message-box__input .el-input--medium .el-input__inner {
  border: 0 !important;
  border-bottom: 1px solid #ccc;
}

.confirm {
  padding: 0 40px !important;
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-table__body tr.hover-row:hover {
  background: #212e3e !important;
}
</style>