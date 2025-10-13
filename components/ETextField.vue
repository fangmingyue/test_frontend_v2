<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  type?: string
}
const model = defineModel<any>()
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="text-lg mb-2">{{ props.label }} :</label>
    <input v-model="model" :type="props.type" class="p-1" />
  </div>
</template>

<style scoped lang="scss"></style>
