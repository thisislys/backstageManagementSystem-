/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examsRouter = {
  path: '/examination',
  component: Layout,
  redirect: 'noredirect',
  name: 'Exam',
  alwaysShow: true,
  hidden:false,
  meta: {
    title: 'usermanagement',
    icon: 'form'
  },
  children: [{
      path: 'addmination',
      component: () => import('@/views/exam/examination/addmination'),
      name: 'addmination',
      meta: {
        title: 'thetest',
        noCache: true,
        view_id: "main-examEdit"
      }
    },
    {
      path: 'minationlist',
      component: () => import('@/views/exam/examination/minationlist'),
      name: 'minationlist',
      meta: {
        title: 'testlist',
        noCache: true,
        view_id: "main-examList"
      }
    },
    {
      path: 'newExam',
      component: () => import('@/views/exam/examination/newExam'),
      hidden: true,
      meta: {
        title: '',
        noCache: true,
        view_id: "main-examList"
      }
    },
    {
      path: 'detail',
      component: () => import('@/views/exam/examination/detail'),
      hidden: true,
      meta: {
        title: '',
        noCache: true,
        view_id: "main-examDetail"
      }
    }
  ]
}

export default examsRouter
