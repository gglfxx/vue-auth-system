import service from '@/utils/service'
// 主页
export const getGridData = () => service.get('/authSys/grid')

export const getLineChartData = (data) => service.get('/authSys/lineChart', data)

export const getTodoListData = () => service.get('/authSys/todoList')
