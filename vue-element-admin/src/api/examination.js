import request from '@/utils/request'

//获取类型
export let ClassType = () => {
  return request.get('/exam/examType');
}

//获取课程
export let Subject = () => {
  return request.get('/exam/subject');
}

//创建试卷
export let CreateExam = data => {
  return request.post('/exam/exam', data);
}

//试卷列表
export let AllExam = params => {
  return request.get('/exam/exam', params);
}

//更新试卷
export let UpdateExam= params => {
  return request.put(`/exam/exam/${params.examID}`,params.question_ids);
}

//试卷详情
export let DetailExam= params => {
  console.log(params,'param')
  return request.get(`/exam/exam/${params.examID}`);
}