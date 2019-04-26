<template>
  <div>
    <pan-thumb :image="userInfo.avatar"/>

    <el-button
      type="primary"
      icon="upload"
      style="position: absolute;bottom: 15px;margin-left: 40px;"
      @click="imagecropperShow=true"
    >Change Avatar</el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="http://123.206.55.50:11000/upload"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>
<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import { mapState, mapActions, mapMutations } from "vuex";
import { constants } from "fs";
export default {
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"
    };
  },
  components: { ImageCropper, PanThumb },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapActions({
      setUpdataUserInfo: "userManagement/setUpdataUserInfo",
      getQuestionsType: "exam/getQuestionsType"
    }),
    ...mapActions({
      getInfo: "user/getInfo"
    }),
    close() {
      this.imagecropperShow = false;
    },
    async cropSuccess(e) {
      this.image = e[0].path;
      let res = await this.setUpdataUserInfo({
        user_id: this.userInfo.user_id,
        avatar: this.image
      });
      this.$message({
        showClose: true,
        message: res.msg,
        type: "warning"
      });
      await this.getInfo({ avatar: this.image });
      this.imagecropperShow = false;
      // console.log(this.userInfo, 7);
    }
  },
  async created() {
    await this.getQuestionsType();
    // console.log(this.userInfo, 7);
    this.userInfo.avatar ? (this.image = this.userInfo.avatar) : this.image;
  }
};
</script>
<style lang="scss" scoped>
</style>


