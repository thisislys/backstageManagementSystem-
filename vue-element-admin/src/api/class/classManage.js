import request from '@/utils/request'
//班级列表
export let upDateClass = () => {
    return request.get('/manger/grade');
}
//获取所有未分配教室的班级
export let upDateNewClass = () => {
    return request.get('/manger/grade/new');
}

//添加班级
export let addClass = params => {
    return request.post('/manger/grade', params);
}

//更新班级
export let updateClasses = params => {
    return request.put('/manger/grade/update', params);
}

//删除班级
export let deleteClass = params => {
    return request.delete('/manger/grade/delete',{data:params});
}
//获取所有的教室
export let getAllRoom = () => {
    return request.get('/manger/room');
}

//获取所有课程
export let getAllSubject = () => {
    return request.get('/exam/subject');
}