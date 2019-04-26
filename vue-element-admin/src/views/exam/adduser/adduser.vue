<template>
  <div class="wrap">
    <p>添加用户</p>
    <div class="box">
      <div class="user">
        <p>
          <span :id="idx===0?'blue':'gray'" @click="change(0)">添加用户</span>
          <span :id="idx===1?'blue':'gray'" @click="change(1)" class="updataTit">更新用户</span>
        </p>
        <div v-if="idx===0">
          <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          <el-input v-model="pwd" placeholder="请输入密码" show-password></el-input>
          <el-select v-model="identityId" placeholder="请选择身份id">
            <el-option
              v-for="(item,index) in identitysData"
              :key="index"
              :label="item.identity_text"
              :value="item.identity_text"
            ></el-option>
          </el-select>
        </div>
        <div v-if="idx===1">
          <el-select v-model="userId" placeholder="请选择用户id">
            <el-option
              v-for="(item,index) in userData"
              :key="index"
              :label="item.user_name"
              :value="item.user_name"
            ></el-option>
          </el-select>
          <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          <el-input v-model="pwd" placeholder="请输入密码" show-password></el-input>
          <el-select v-model="identityId" placeholder="请选择身份id">
            <el-option
              v-for="(item,index) in identitysData"
              :key="index"
              :label="item.identity_text"
              :value="item.identity_text"
            ></el-option>
          </el-select>
        </div>

        <div class="btn">
          <el-button type="primary" @click="user">确定</el-button>
          <el-button plain @click="reset(1)">重置</el-button>
        </div>
      </div>
      <div class="user">
        <p>
          <span>添加身份</span>
        </p>
        <el-input v-model="identityName" placeholder="请输入身份名称"></el-input>
        <div class="btn">
          <el-button type="primary" @click="identity">确定</el-button>
          <el-button plain @click="reset(2)">重置</el-button>
        </div>
      </div>
      <div class="user">
        <p>
          <span>添加api接口权限</span>
        </p>
        <el-input v-model="apiJurisdictionName" placeholder="请输入api接口权限名称"></el-input>
        <el-input v-model="apiJurisdictionUrl" placeholder="请输入api接口权限url"></el-input>
        <el-input v-model="apiJurisdictionMethod" placeholder="请输入api接口权限方法"></el-input>
        <div class="btn">
          <el-button type="primary" @click="jurisdiction">确定</el-button>
          <el-button plain @click="reset(3)">重置</el-button>
        </div>
      </div>
      <div class="user">
        <p>
          <span>添加视图接口权限</span>
        </p>

        <div>
          <el-select v-model="existingView" placeholder="请选择已有视图">
            <el-option
              v-for="(item,index) in identityViewAuthorityRelationsData"
              :key="index"
              :label="item.view_authority_text"
              :value="item.view_authority_text"
            ></el-option>
          </el-select>
         
        </div>
        <div class="btn">
          <el-button type="primary" @click="view">确定</el-button>
          <el-button plain @click="reset(4)">重置</el-button>
        </div>
      </div>

      <div class="user">
        <p>
          <span>给身份设置api接口权限</span>
        </p>
        <div>
          <el-select v-model="identityId2" placeholder="请选择身份id">
            <el-option
              v-for="(item,index) in identitysData"
              :key="index"
              :label="item.identity_text"
              :value="item.identity_text"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="apiJurisdictionId" placeholder="请选择api接口权限id">
            <el-option
              v-for="(item,index) in apiAuthoritysData"
              :key="index"
              :label="item.api_authority_text"
              :value="item.api_authority_text"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" @click="api">确定</el-button>
          <el-button plain @click="reset(5)">重置</el-button>
        </div>
      </div>
      <div class="user">
        <p>
          <span>给身份设置视图权限</span>
        </p>
        <div>
          <el-select v-model="identityId3" placeholder="请选择身份id">
            <el-option
              v-for="(item,index) in identitysData"
              :key="index"
              :label="item.identity_text"
              :value="item.identity_text"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="viewJurisdictionId" placeholder="请选择视图权限id">
            <el-option
              v-for="(item,index) in viewAuthoritysData"
              :key="index"
              :label="item.view_authority_text"
              :value="item.view_authority_text"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" @click="set">确定</el-button>
          <el-button plain @click="reset(6)">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { constants } from "fs";
export default {
  data() {
    return {
      userId: "", //用户id
      userName: "", //用户名
      pwd: "", //用户密码
      identityId: "", //身份id
      identityId2: "", //身份id2
      identityId3: "", //身份id3
      identityName: "", //身份名称
      apiJurisdictionName: "", //api接口权限名称
      apiJurisdictionUrl: "", //api接口权限url
      apiJurisdictionMethod: "", //api接口权限方法
      existingView: "", //已有视图
      apiJurisdictionId: "", //api接口权限id
      viewJurisdictionId: "", //视图权限id
      idx: 0 //tab切换
    };
  },
  computed: {
    ...mapState({
      identityViewAuthorityRelationsData: state =>
        state.userShow.identityViewAuthorityRelationsData, //已有视图值
      apiAuthoritysData: state => state.userShow.apiAuthoritysData, //api接口权限数据
      viewAuthoritysData: state => state.userShow.viewAuthoritysData, //视图权限数据
      identitysData: state => state.userShow.identitysData, //身份数据
      userData: state => state.userShow.userData, //用户数据
      code: state => state.userManagement.code, //code
      msg: state => state.userManagement.msg //msg
    })
  },
  methods: {
    ...mapActions({
      setAddUsers: "userManagement/setAddUsers", //添加用户
      setUpdataUserInfo: "userManagement/setUpdataUserInfo", //更新用户信息
      setAddIdentity: "userManagement/setAddIdentity", //添加身份
      setAddAuthorityApi: "userManagement/setAddAuthorityApi", //添加api接口权限
      setAddAuthorityView: "userManagement/setAddAuthorityView", //添加视图接口权限
      setIdentityApi: "userManagement/setIdentityApi", //给身份设置api接口权限
      setIdentityView: "userManagement/setIdentityView", //给身份设置视图权限
      setUserData: "userShow/setUserData", // 展示用户数据
      setidentity: "userShow/setidentity", //展示身份数据
      setApiAuthority: "userShow/setApiAuthority", //展示api接口权限数据
      setViewAuthority: "userShow/setViewAuthority", // 获取视图权限数据
      setidentityViewAuthorityRelation:
        "userShow/setidentityViewAuthorityRelation" //展示身份和视图权限关系
    }),
    //tab切换
    change(idx) {
      this.idx = idx;
    },
    //重置
    reset(idx) {
      if (idx === 1) {
        this.userId = "";
        this.userName = "";
        this.pwd = "";
        this.identityId = "";
      } else if (idx === 2) {
        this.identityName = "";
      } else if (idx === 3) {
        this.apiJurisdictionName = "";
        this.apiJurisdictionUrl = "";
        this.apiJurisdictionMethod = "";
      } else if (idx === 4) {
        this.existingView = "";
      } else if (idx === 5) {
        this.identityId2 = "";
        this.apiJurisdictionId = "";
      } else if (idx === 6) {
        this.identityId3 = "";
        this.viewJurisdictionId = "";
      }
    },
    //用户
    async user() {
      let obj = {},
        obj1 = {};
      obj = this.identitysData.find(item => {
        return item.identity_text === this.identityId;
      });
      obj1 = this.userData.find(item => {
        return item.user_name === this.userId;
      });
      if (this.idx === 0) {
        //添加用户
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        var Reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if (!this.userName.match(uPattern)) {
          this.$message({
            showClose: true,
            message: "请输入正确的用户名",
            type: "warning"
          });
          return false;
        } else if (!this.pwd.match(Reg)) {
          this.$message({
            showClose: true,
            message: "请输入正确的用户密码",
            type: "warning"
          });
          return false;
        }
        await this.setAddUsers({
          user_name: this.userName,
          user_pwd: this.pwd,
          identity_id: obj.identity_id
        });
        this.hint();

      } else {
        //更新用户
        if (!this.identityId) {
          this.$message({
            showClose: true,
            message: "请选择身份id",
            type: "warning"
          });
          return false;
        }
        await this.setUpdataUserInfo({
          user_id: obj1.user_id,
          user_name: this.userName,
          user_pwd: this.pwd,
          identity_id: obj.identity_id
        });
      }
      this.hint();
    },
    //身份
    async identity() {
      if (!this.identityName) {
        this.$message({
          showClose: true,
          message: "请输入身份名称",
          type: "warning"
        });
        return false;
      }
      await this.setAddIdentity({
        identity_text: this.identityName
      });
      this.hint();
      await this.setidentity();
    },
    //api接口权限
    async jurisdiction() {
      if (!this.apiJurisdictionName) {
        this.$message({
          showClose: true,
          message: "请输入api接口权限名称",
          type: "warning"
        });
        return false;
      }
      if (!this.apiJurisdictionUrl) {
        this.$message({
          showClose: true,
          message: "请输入api接口权限url",
          type: "warning"
        });
        return false;
      }
      if (!this.apiJurisdictionMethod) {
        this.$message({
          showClose: true,
          message: "请输入api接口权限方法",
          type: "warning"
        });
        return false;
      }
      await this.setAddAuthorityApi({
        api_authority_text: this.apiJurisdictionName,
        api_authority_url: this.apiJurisdictionUrl,
        api_authority_method: this.apiJurisdictionMethod
      });
      this.hint();
      await this.setApiAuthority();
    },
    //视图接口权限
    async view() {
      let obj = {};
      obj = this.identityViewAuthorityRelationsData.find(item => {
        return item.view_authority_text === this.existingView;
      });
      if (!this.existingView) {
        this.$message({
          showClose: true,
          message: "请选择已有视图",
          type: "warning"
        });
        return false;
      }
      await this.setAddAuthorityView({
        view_authority_text: this.existingView,
        view_id: obj.view_id 
      });
      this.hint();
    },
    // 给身份设置api接口权限
    async api() {
      let obj = {},
        obj1 = {};
      obj = this.identitysData.find(item => {
        return item.identity_text === this.identityId2;
      });
      obj1 = this.apiAuthoritysData.find(item => {
        return item.api_authority_text === this.apiJurisdictionId;
      });
      if (!this.identityId2) {
        this.$message({
          showClose: true,
          message: "请选择身份id",
          type: "warning"
        });
        return false;
      }
      if (!this.apiJurisdictionId) {
        this.$message({
          showClose: true,
          message: "请选择api接口权限id",
          type: "warning"
        });
        return false;
      }
      await this.setIdentityApi({
        identity_id: obj.identity_id,
        api_authority_id: obj1.api_authority_id
      });
      this.hint();
    },
    //给身份设定视图权限
    async set() {
      let obj = {},
        obj1 = {};
      obj = this.identitysData.find(item => {
        return item.identity_text === this.identityId3;
      });
      obj1 = this.viewAuthoritysData.find(item => {
        return item.view_authority_text === this.viewJurisdictionId;
      });
      if (!this.identityId3) {
        this.$message({
          showClose: true,
          message: "请选择身份id",
          type: "warning"
        });
        return false;
      }
      if (!this.viewJurisdictionId) {
        this.$message({
          showClose: true,
          message: "请选择视图权限id",
          type: "warning"
        });
        return false;
      }
      await this.setIdentityView({
        identity_id: obj.identity_id,
        view_authority_id: obj1.view_authority_id
      });
      this.hint();
    },
    //提示
    hint() {
      if (this.code == 1) {
        this.$message({
          message: this.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: this.msg,
          type: "error"
        });
      }
    },
  },
  async created() {
    await this.setidentityViewAuthorityRelation();
    await this.setUserData();
    await this.setidentity();
    await this.setApiAuthority();
    await this.setViewAuthority();
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
  > p {
    font-size: 22px;
  }
}
.box {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  .user {
    min-height: 260px;
    width: 33%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 0 10px;
    .btn {
      margin: 8px 0;
    }
    span {
      font-size: 14px;
      background: #fff;
      padding: 0 10px;
      border: 1px solid #0139fd;
      color: #0139fd;
      cursor: pointer;
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }

    .updataTit {
      border: 1px solid #ccc;
      color: #ccc;
      margin-left: -1px;
    }
    #blue {
      border: 1px solid #0139fd;
      color: #0139fd;
    }
    #gray {
      border: 1px solid #ccc;
      color: #ccc;
    }
  }
}
.el-select {
  margin: 8px 0;
  width: 180px;
}
.el-button--primary {
  width: 120px;
}
.el-input {
  margin: 8px 0;
}
</style>