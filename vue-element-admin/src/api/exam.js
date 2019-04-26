import request from '@/utils/request'
//添加试题接口
export let additem = params => {
    return request.post('/exam/questions', params);
}
//获取考试类型
export let getitem = params => {
    return request.get('/exam/examType', params);
}
//获取所有课程
export let subject = params => {
    return request.get('/exam/subject', params);
}
//获取试题类型
export let getQuestionsType = params => {
    return request.get('/exam/getQuestionsType', params);
}
//获取用户信息
export let getuser = params => {
    return request.get('/user/userInfo', params);
}
//获取所有的试题
export let questions = params => {
    return request.get('/exam/questions/new', params);
}
//条件查询
export let condition = params => {
    return request.get('/exam/questions/condition', {params});
}
//更新试题
export let update = params => {
    return request.put('/exam/questions/update', params);
}
//添加试题类型
export let addtype = params => {
    return request.get('/exam/insertQuestionsType', {params});
}
//测试删除接口
// export let deletes = params => {
//     console.log(params,'sadad215')
//     return request.delete('/manger/grade/delete', {data:params});
// }
