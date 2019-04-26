import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import createlogger from 'vuex/dist/logger'

//引入store
import exam from './modules/exam'
import login from './modules/login'
import examination from './modules/examination'

import classManage from './modules/classManage'
import classRoom from './modules/classroom'
import student from './modules/student'
import approval from './modules/approval'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', false, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {
  exam,
  login,
  examination,
  classManage,
  classRoom,
  student,
  approval
})

const store = new Vuex.Store({
  modules,
  getters

  // plugins:[createlogger()]
})

export default store
