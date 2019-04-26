/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import childrens from './child'
const examsRouter = {
  path: '/Additem',
  component: Layout,
  redirect: '/Additem/add',
  name: 'Exam',
  alwaysShow: true,
  hidden:false,
  meta: {
    title: 'Additem',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/exam/questions/add'),
      name: 'add',
      meta: { title: 'testquestions', noCache: true , view_id:'main-addQuestions'}
    },
    {
      path: 'classify',
      component: () => import('@/views/exam/questions/classify'),
      name: 'classify',
      meta: { title: 'classification', noCache: true , view_id:'main-questionsType'}
    },
    {
      path: 'examin',
      component: () => import('@/views/exam/questions/examin'),
      name: 'examin',
      meta: { title: 'Checktheitem', noCache: true , view_id:'main-watchQuestions'}
    },
    {
      path: 'adds',
      component: () => import('@/views/exam/questions/add'),
      hidden: true,
      meta: { title: '', noCache: true , view_id:'main-editQuestions'}
    },
    {
      path: 'detail',
      component: () => import('@/views/exam/questions/detail'),
      hidden: true,
      meta: { title: '', noCache: true , view_id:'main-questionsDetail'}
    },
  ]
}

export default examsRouter
