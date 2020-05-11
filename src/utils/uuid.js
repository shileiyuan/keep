import { v4 as uuidv4 } from 'uuid'

// 生成随机的36位UUID
export default function uuid() {
  return uuidv4().replace(/-/g, '')
}
