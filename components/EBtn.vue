<template>
  <button type="button" class="cursor-pointer" :class="btnClass">
    {{ props.text ?? '' }}
    <slot v-if="!props.text" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  color?: 'success' | 'error' | 'warn'
}

const props = withDefaults(defineProps<Props>(), { color: 'success' })

const btnClass = computed(() => `e-btn-${props.color}`)
</script>

<style scoped lang="scss">
.e-btn-success {
  background: green;
  color: #fff;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 4px 8px;
  font-size: 16px;
  width: 60px;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.e-btn-error {
  background: red;
  color: #fff;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 4px 8px;
  font-size: 16px;
  width: 60px;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.e-btn-warn {
  background: orange;
  color: #000;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 4px 8px;
  font-size: 16px;
  width: 60px;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
}
</style>
