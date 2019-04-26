/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const examRouter = {
  path: '/Additems',
  component: () => import('@/views/exam/questions/add'),
  redirect: 'noredirect',
  name: 'Exam',
  alwaysShow: true,
  hidden:false,
}

export default examRouter