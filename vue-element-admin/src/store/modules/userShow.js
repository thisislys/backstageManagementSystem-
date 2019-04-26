import {
  userData,
  identity,
  apiAuthority,
  identityApiAuthorityRelation,
  viewAuthority,
  identityViewAuthorityRelation
} from '@/api/userManagement';

const state = {
  userData: [], //获取用户数据
  identitysData: [], //获取身份数据
  apiAuthoritysData: [], //获取api接口权限数据
  viewAuthoritysData: [], //获取视图权限数据
  identityViewAuthorityRelationsData: [], //获取身份和视图权限关系
  identityApiAuthorityRelationsData: [], //获取身份和api权限关系
  page: 1, //第几页
  pageSize: 10, //每页十条
  active: 0,
  data: [],
}

const mutations = {
  //获取用户数据
  userDatas(state, payload) {
    loop(state.userData, payload)
    state.data = state.userData.slice(0, 10)
  },
  //获取身份数据
  identitys(state, payload) {
    loop(state.identitysData, payload)
  },
  //获取api接口权限数据
  apiAuthoritys(state, payload) {
    loop(state.apiAuthoritysData, payload)
  },
  //获取身份和api权限关系
  identityApiAuthorityRelations(state, payload) {
    loop(state.identityApiAuthorityRelationsData, payload)
  },
  //获取视图权限数据
  viewAuthoritys(state, payload) {
    loop(state.viewAuthoritysData, payload)
  },
  //获取身份和视图权限关系
  identityViewAuthorityRelations(state, payload) {
    loop(state.identityViewAuthorityRelationsData, payload)
  },
  list(state, payload) {
    state.data = pageList(payload.idx ? payload.pages = 1 : payload.pages, state[payload.data])
  }
}

const actions = {
  // 展示用户数据
  async setUserData({
    commit,state
  }, payload) {
    state.userData=[];
    let result = await userData(payload);
    commit('userDatas', result.data)
    return result
  },
  //展示身份数据
  async setidentity({
    commit,state
  }, payload) {
    state.identitysData=[];
    let result = await identity(payload);
    commit('identitys', result.data)
  },
  //展示api接口权限数据
  async setApiAuthority({
    commit,state
  }, payload) {
    state.apiAuthoritysData=[];
    let result = await apiAuthority(payload);
    commit('apiAuthoritys', result.data)
  },
  // 展示身份和api权限关系
  async setIdentityApiAuthorityRelation({
    commit,state
  }, payload) {
    state.identityApiAuthorityRelationsData=[];
    let result = await identityApiAuthorityRelation(payload);
    commit('identityApiAuthorityRelations', result.data)
  },
  // 获取视图权限数据
  async setViewAuthority({
    commit,state
  }, payload) {
    state.viewAuthoritysData=[];
    let result = await viewAuthority(payload);

    commit('viewAuthoritys', result.data)
  },
  //展示身份和视图权限关系
  async setidentityViewAuthorityRelation({
    commit,state
  }, payload) {
    state.identityViewAuthorityRelationsData=[];
    let result = await identityViewAuthorityRelation(payload);
    commit('identityViewAuthorityRelations', result.data)
  }
}

//0 9     (1-1)*10,1*10
//10 19   (2-1)*10,2*10
//20 29   (3-1)*10,3*10
//30 39   (4-1)*10,4*10
//(state.page-1)*state.pageSize,state.page*state.pageSize
//页面数据
function pageList(page, data) {
  if (page === 1) {
    data = data.slice(0, 10)
  } else {
    data = data.slice((page - 1) * 10, page * 10)
  }
  return data
}

//循环
function loop(data, payload) {
  for (let key in payload) {
    data[key] = payload[key]
  }
  return data
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
