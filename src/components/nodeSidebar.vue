<template>
  <div class="sidebar" v-if="props.node">
    <h2>Node Details</h2>
    <p><strong>ID:</strong> {{ node.id }}</p>
    <p><strong>Name:</strong> {{ node.name }}</p>
    <button @click="emit('close')">Close</button>
  </div>
</template>

<script setup lang="ts">
import type { CharacterNode } from '@/models/CharacterNode'
import { computed } from 'vue'

const props = defineProps<{
  node: CharacterNode | null
}>()

const node = computed(() => props.node)

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.sidebar {
  width: 250px;
  padding: 16px;
  background: #fafafa;
  border-left: 1px solid #ccc;
}
</style>
