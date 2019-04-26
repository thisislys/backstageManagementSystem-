import {
  addUsers,
  updataUserInfo,
  addIdentity,
  addAuthorityApi,
  addAuthorityView,
  identityApi,
  identityView
} from '@/api/userManagement';

const state = {
  code: '',
  msg: ''
}

const mutations = {
  Tips(state, result) {
    if (result) {
      state.code = result.code;
      state.msg = result.msg;
    }
  }
}

const actions = {
  //添加用户
  async setAddUsers({
    commit
  }, payload) {
    let result = await addUsers(payload);
    commit('Tips', result)
    return result;
  },
  //更新用户信息（用户名，用户密码，用户身份）
  async setUpdataUserInfo({
    commit
  }, payload) {
    let result = await updataUserInfo(payload);
    commit('Tips', result)
    return result;
  },
  //添加身份
  async setAddIdentity({
    commit
  }, payload) {
    let result = await addIdentity(payload);
    commit('Tips', result)
    return result;
  },
  //添加api接口权限
  async setAddAuthorityApi({
    commit
  }, payload) {
    let result = await addAuthorityApi(payload);
    commit('Tips', result)
    return result;
  },
  //添加视图权限
  async setAddAuthorityView({
    commit
  }, payload) {
    let result = await addAuthorityView(payload);
    commit('Tips', result)
    return result;
  },
  //给身份设定api接口权限
  async setIdentityApi({
    commit
  }, payload) {
    let result = await identityApi(payload);
    commit('Tips', result)
    return result;
  },
  //给身份设定视图权限
  async setIdentityView({commit}, payload) {
    let result = await identityView(payload);
    commit('Tips', result)
    return result;
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
