import request from '@/utils/request'

// 查看所有的学生

export let upDateStudent = () => {
    return request.get('/manger/student');
}
//获取所有未分配班级的学生

export let upDateNewStudent = () => {
    return request.get('/manger/student/new');
}

//添加学生
export let addStudent = params => {
    return request.post('/manger/student', params);
}

//修改学生

export let updateStudents = params => {
    return request.put('/manger/student/edit', params);
}

//删除学生  传student_id即可

export let deleteStudent = params => {
    return request.delete(`/manger/student/${params.student_id}`);
}
