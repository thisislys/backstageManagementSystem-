/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noredirect',
  name: 'User',
  meta: {
    title: 'question',
    icon: 'user'
  },
  children: [
    {
      path: 'update',
      component: () => import('@/views/user/update'),
      name: 'adduser',
      meta: { title: 'update', noCache: true ,view_id: "main-addUser"}
    }
  ]
}

export default userRouter
