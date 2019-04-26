import { CreateExam,ClassType,Subject,AllExam,UpdateExam,DetailExam } from '@/api/examination.js'

const state = {
    ClassTypeData:[],
    SubjectData:[],
    AllExamData:[],
    CreateExamData:[],
    CreateExamDataFun:[],
    UpdateExamData:[],
    DetailExamData:[]
}

const mutations = {
  getCreateExam(state,payload){
    state.CreateExamData = payload
  },
  getClassType(state,payload){
    state.ClassTypeData = payload
  },
  getSubject(state,payload){
    state.SubjectData = payload
  },
  getAllExam(state,payload){
    state.AllExamData = payload
  },
  getCreateExamFun(state,payload){
    state.CreateExamDataFun = payload
  },
  getUpdateExam(state,payload){
    state.UpdateExamData = payload
  },
  getDetailExam(state,payload){
    state.DetailExamData = payload
  }
}

const actions = {
  //获取课程类型
  async ClassType({commit},payload){
    let result = await ClassType()
    commit('getClassType',result.data)
  },
  //获取课程
  async Subject({commit},payload){
    let result = await Subject()
    commit('getSubject',result.data)
  },
  //创建试卷
  async CreateExam({commit},payload){
    let result = await CreateExam(payload)
    commit('getCreateExam',result.data)
    commit('getCreateExamFun',payload)
    return result.data.questions
  },
  //获取所有试卷列表
  async AllExam({commit},payload){
    let result = await AllExam()
    commit('getAllExam',result.exam)    
  },
  //更新试卷
  async UpdateExam({commit},payload){
    let result = await UpdateExam(payload)
    commit('getUpdateExam',result)
  },
  //试卷详情
  async DetailExam({commit},payload){
    let result = await DetailExam(payload)
    commit('getDetailExam',result.data.questions)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
