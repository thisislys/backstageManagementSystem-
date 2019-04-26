/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examsRouter = {
  path: '/approval',
  component: Layout,
  redirect: 'noredirect',
  name: 'Exam',
  alwaysShow: true,
  hidden:false,
  meta: {
    title: 'Markingmanagement',
    icon: 'excel'
  },
  children: [
    {
      path: 'approvals',
      component: () => import('@/views/exam/approval/approval'),
      name: 'approvals',
      meta: { title: 'approvalclass', noCache: true ,view_id: "main-examPaperClassmate"}
    },
    {
      path: 'app_detail',
      component: () => import('@/views/exam/approval/app_detail'),
      name: 'app_detail',
      hidden: true,
      meta: { title: 'approvalclass', noCache: true ,view_id: "main-examPaperClassList"}
    }
  ]
}

export default examsRouter
