import request from '@/utils/request'

// 获取所有的教室
export let upDateRoom = () => {
    return request.get('/manger/room');
}


//添加教室
export let addRoom = params => {
    return request.post('/manger/room', params);
}

//更新教室
export let updateRooms = params => {
    return request.put('/manger/room/update', params);
}

//删除教室
export let deleteRoom = params => {
    return request.delete('/manger/room/delete',{data:params});
}
