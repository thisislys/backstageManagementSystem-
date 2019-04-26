import request from '@/utils/request'
//添加试题接口
export let grade = () => {
    return request.get('/manger/grade');
}