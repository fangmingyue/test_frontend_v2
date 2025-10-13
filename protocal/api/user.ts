import http from '@/utils/request'

// 定義回傳型別（可選）
interface UserList {
  id: number
  name: string
  age: number
}

// 取得用戶清端
export const getUserList = () => http.get<UserList>('/api/user')

// 修改用戶資訊
export const putUserList = (data: { name: string; age: number; id: number }) =>
  http.put<UserList>('/api/user', data)

// 創建用戶
export const postUserList = (data: { name: string; age: number }) => http.post('/api/user', data)

// 刪除用戶
export const delUserList = (data: { id: number }) => http.delete('/api/user', data)
