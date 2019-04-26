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
  existingViewValue: [], //已有视图
  apiJurisdictionIdValue: [], //api接口权限id
  viewJurisdictionIdValue: [], //视图权限id
  identityIdValue: [], //身份id
  userIdValue: [], //用户id
  page: 1, //第几页
  pageSize: 10, //每页十条
  active: 0,
  data: [],
}

const mutations = {
  //获取用户数据
  userDatas(state, payload) {
    loop(state.userData, payload)
    state.userData.forEach(item => {
      //用户id
      state.userIdValue.push({user_name:item.user_name,user_id:item.user_id})
    })
    deWeight(state.userIdValue)
    state.data = state.userData.slice(0, 10)

  },
  //获取身份数据
  identitys(state, payload) {
    loop(state.identitysData, payload)
    state.identitysData.forEach(item => {
      //身份id
      state.identityIdValue.push({identity_text:item.identity_text,identity_id:item.identity_id})
    })
    deWeight(state.identityIdValue)
  },
  //获取api接口权限数据
  apiAuthoritys(state, payload) {
    loop(state.apiAuthoritysData, payload)
    state.apiAuthoritysData.forEach(item => {
      //api接口权限id
      state.apiJurisdictionIdValue.push({api_authority_text:item.api_authority_text,api_authority_id:item.api_authority_id})
    })
    deWeight(state.apiJurisdictionIdValue)
  },
  //获取身份和api权限关系
  identityApiAuthorityRelations(state, payload) {
    loop(state.identityApiAuthorityRelationsData, payload)
    deWeight(state.identityApiAuthorityRelationsData)
  },
  //获取视图权限数据
  viewAuthoritys(state, payload) {
    loop(state.viewAuthoritysData, payload)
    state.viewAuthoritysData.forEach(item => {
      //视图权限id
      state.viewJurisdictionIdValue.push({view_authority_text:item.view_authority_text,view_authority_id:item.view_authority_id})
    })
    deWeight(state.viewJurisdictionIdValue)
  },
  //获取身份和视图权限关系view_authority_text
  identityViewAuthorityRelations(state, payload) {
    loop(state.identityViewAuthorityRelationsData, payload)
    state.identityViewAuthorityRelationsData.forEach(item => {
      //已有视图
      state.existingViewValue.push({
        authority: item.view_authority_text,
        view_id: item.view_id
      })
    })
    deWeight(state.existingViewValue)
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
    state.userIdValue=[];
    let result = await userData(payload);
    commit('userDatas', result.data)
    return result
  },
  //展示身份数据
  async setidentity({
    commit,state
  }, payload) {
    state.identityIdValue=[];
    let result = await identity(payload);
    commit('identitys', result.data)
  },
  //展示api接口权限数据
  async setApiAuthority({
    commit,state
  }, payload) {
    state.apiJurisdictionIdValue=[];
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
    state.viewJurisdictionIdValue=[];
    let result = await viewAuthority(payload);
    commit('viewAuthoritys', result.data)
  },
  //展示身份和视图权限关系
  async setidentityViewAuthorityRelation({
    commit,state
  }, payload) {
    state.existingViewValue=[];
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

//去重
function deWeight(data) {
  return data = [...new Set(data)]
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
