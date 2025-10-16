<script setup lang="ts">
import { ref } from 'vue'
import { Delete, DocumentAdd, Edit } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getUserList, postUserList, delUserList, putUserList } from '@/protocal/api/user'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/composables/store/app'
import EBtn from '@/components/EBtn.vue'
import ETextField from '@/components/ETextField.vue'
// !資料 --------------------------------------------------------------------------------------------
const { locale } = useI18n()

const appStore = useAppStore()

const dialogTableVisible = ref(false)

interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}
interface RuleForm {
  name: string
  age: number
}

interface FormData {
  id: number
  name: string
  age: number
}

interface UserList {
  id: number
  name: string
  age: number
}

const memberList = ref<UserList>()

const ruleFormRef = ref<FormInstance>()
const formDataRef = ref<FormInstance>()

const ruleForm = reactive<RuleForm>({
  name: '',
  age: 0,
})

const formData = reactive<FormData>({
  id: 0,
  name: '',
  age: 0,
})

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '請輸入名字', trigger: 'blur' }],
  age: [
    { required: true, message: '請輸入年齡', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 空值交給 required 規則處理
        if (value === undefined || value === null || value === '') {
          return callback()
        }

        // 檢查型別
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return callback(new Error('年齡必須是數字'))
        }

        // 檢查範圍（不能小於或等於 0）
        if (value <= 0) {
          return callback(new Error('年齡不能小於或等於 0'))
        }
        // 檢查範圍（例如最多三位數）
        if (value > 999) {
          return callback(new Error('年齡不能超過 3 位數'))
        }

        callback() // 通過驗證
      },
      trigger: 'blur',
    },
  ],
})

const rules1 = reactive<FormRules<FormData>>({
  id: [{ required: true, message: '請輸入ID', trigger: 'blur' }],
  name: [{ required: true, message: '請輸入名字', trigger: 'blur' }],
  age: [
    { required: true, message: '請輸入年齡', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 空值交給 required 規則處理
        if (value === undefined || value === null || value === '') {
          return callback()
        }

        // 檢查型別
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return callback(new Error('年齡必須是數字'))
        }

        // 檢查範圍（不能小於或等於 0）
        if (value <= 0) {
          return callback(new Error('年齡不能小於或等於 0'))
        }
        // 檢查範圍（例如最多三位數）
        if (value > 130) {
          return callback(new Error('年齡不能超過130歲'))
        }

        callback() // 通過驗證
      },
      trigger: 'blur',
    },
  ],
})

const language = [
  { label: '繁體中文', value: 'zh-TW' },
  { label: 'English', value: 'en-US' },
]

// !接收事件 -----------------------------------------------------------------------------------------
// 切換語系
// const switchLocale = async (lang: any) => {
//   locale.value = lang
//   appStore.lang = lang
//   ruleForm.name = ''
//   ruleForm.age = 0
//   ruleFormRef.value?.clearValidate()
// }

// 操作列表清空
const clearOperateList = () => {
  ruleForm.name = ''
  ruleForm.age = 0
}
//-------------------------------------------------------------------------------------------------

// 操作新增詢問
const operateAddAsk = async () => {
  try {
    await ElMessageBox.confirm('確定要新增?', '新增詢問', {
      confirmButtonText: '新增',
      cancelButtonText: '取消',
      type: 'warning',
      icon: markRaw(DocumentAdd),
    })
    return true
  } catch {
    return false
  }
}

// 操作新增功能
const submitAddForm = async () => {
  if (!ruleFormRef.value) return
  try {
    await ruleFormRef.value.validate()
    const isOk = await operateAddAsk()
    if (!isOk) return
    await ApiPostUserList()
  } catch (err) {
    console.log('error submit!', err)
  }
}

//-------------------------------------------------------------------------------------------------
// 開啟修改彈窗
const opentEditDialog = (row: any) => {
  Object.assign(formData, row)
  dialogTableVisible.value = true
}

// 修改詢問
const operateEditAsk = async () => {
  try {
    await ElMessageBox.confirm('確定要修改?', '修改詢問', {
      confirmButtonText: '修改',
      cancelButtonText: '取消',
      type: 'warning',
      icon: markRaw(Edit),
    })
    return true
  } catch {
    return false
  }
}

// 修改功能
const operateEditForm = async () => {
  if (!formDataRef.value) return
  try {
    await formDataRef.value.validate()
    const isOk = await operateEditAsk()
    if (!isOk) return
    await ApiPutUserList()
  } catch (err) {
    console.log('error submit!', err)
  }
}

//-------------------------------------------------------------------------------------------------
// 列表刪除詢問
const memberDelAsk = async (name: string) => {
  try {
    await ElMessageBox.confirm('確定要刪除?', '刪除詢問', {
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      type: 'warning',
      icon: markRaw(Delete),
    })
    return true
  } catch {
    return false
  }
}

// 列表刪除功能
const memberClickDelete = async (row: any) => {
  const isOk = await memberDelAsk(row.name)
  if (!isOk) return
  await ApiDelUserList(row.id)
}

// !流程 --------------------------------------------------------------------------------------------

// !函式 --------------------------------------------------------------------------------------------

// !Api ---------------------------------------------------------------------------------------------
// 取得用戶列表
const ApiGetUserList = async () => {
  const res = await getUserList()
  memberList.value = res.data
  console.log(res.data)
}

// 新增用戶列表
const ApiPostUserList = async () => {
  const data = { name: ruleForm.name, age: ruleForm.age }
  const res = await postUserList(data)
  if (res.code === 200) {
    ElMessage({
      message: '新增成功',
      type: 'success',
    })
    ruleForm.name = ''
    ruleForm.age = 0
    await ApiGetUserList()
  }
  console.log(res.data)
}

// 刪除用戶
const ApiDelUserList = async (id: number) => {
  const data = { id: id }
  const res = await delUserList(data)
  if (res.code === 200) {
    ElMessage({
      message: '刪除成功',
      type: 'success',
    })
    await ApiGetUserList()
  }
  console.log(res.data)
}

// 更新用戶
const ApiPutUserList = async () => {
  const data = { id: formData.id, name: formData.name, age: formData.age }
  const res = await putUserList(data)
  if (res.code === 200) {
    ElMessage({
      message: '更新成功',
      type: 'success',
    })
    dialogTableVisible.value = false
    await ApiGetUserList()
  }
  console.log(res.data)
}
// !生命週期 -----------------------------------------------------------------------------------------
onMounted(() => {
  ApiGetUserList()
})
// !對外事件 -----------------------------------------------------------------------------------------

// !watch -------------------------------------------------------------------------------------------
</script>

<template lang="pug">
#Home
  div(class="w-full mx-auto max-w-[768px]")
    //- language
    div(class="w-full flex justify-end mb-4")
      //- el-select(v-model="appStore.lang" size="large" style="width: 120px" @change="switchLocale(appStore.lang)")
      //-   el-option(v-for="item in language" :key="item.value" :label="item.label" :value="item.value")
    div(class="border border-solid border-[#eeeeee] p-5")
      div(class="text-center my-8 text-2xl") {{ $t('operate') }}
      el-form(ref="ruleFormRef" :model="ruleForm" :rules="rules")
        el-form-item(prop="name")
          ETextField(v-model="ruleForm.name" :label="t('name')" type="text")
        el-form-item(prop="age")
          ETextField(v-model.number="ruleForm.age" :label="t('age')" type="number")
        el-form-item
          div(class="w-full flex justify-end gap-2 mt-8")
            el-button(type="info" @click="clearOperateList") {{ $t('clear') }}
            EBtn(color="warn" @click="submitAddForm(ruleForm)")  {{ $t('add') }}
    div(class="mt-10")
      el-table(:data="memberList" style="width:100%" empty-text="沒有資料")
        el-table-column( prop="id" label="#" width="auto" header-align="center" align="center")
        el-table-column( prop="name" :label="t('name')" width="auto" header-align="center" align="center")
        el-table-column( prop="age" :label="t('age')" width="auto" header-align="center" align="center")
        el-table-column( prop="edit" :label="t('operate')" width="auto" header-align="center" align="center")
          template(#default="{row}")
            div(class="w-full flex justify-center gap-2 max-md:flex-col max-md:items-center")
              EBtn(color="success" @click="opentEditDialog(row)") {{ $t('edit') }}
              EBtn(color="error" @click="memberClickDelete(row)") {{ $t('del') }}
  //- 修改dialog
  el-dialog(v-model="dialogTableVisible" :title="t('editInfo')" width="60%")
    el-form(ref="formDataRef" :model="formData" :rules="rules1")
      el-form-item(prop="name")
        ETextField(v-model="formData.name" :label="t('name')" type="text")
      el-form-item(prop="age")
        ETextField(v-model="formData.age" :label="t('age')" type="number")
    template(#footer)
      EBtn(color="success" @click="operateEditForm()") {{ $t('edit') }}
</template>

<style scoped lang="scss">
#Home {
  margin-top: 80px;
  padding: 0 20px 60px;
  @media (max-width: 768) {
    padding: 0 16px 40px;
  }
}

.el-button + .el-button {
  margin-left: 0;
}
</style>
