import { createHashHistory } from 'history'

// 手动创建 history 对象，请求库和路由共用一个对象，请求库监听这个对象实现自动取消功能
const history = createHashHistory()

export default history
