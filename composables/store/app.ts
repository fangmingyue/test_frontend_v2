export const useAppStore = defineStore('appStore', () => {
  interface UserList {
    id: number
    name: string
    age: number
  }
  const memberList = ref<any>()
  return { memberList }
})
