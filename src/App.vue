<template>
  <div class="app">
    <v-network-graph :nodes="nodesObject" :edges="edgesObject" :event-handlers="eventHandlers" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { CharacterNode } from '@/models/CharacterNode'
import { KnowEdge } from '@/models/KnowEdge'
import type * as vNG from 'v-network-graph'
import { RpgAssistantService } from './services/RpgAssistant'

let rpgAssistantService: RpgAssistantService

onBeforeMount(() => {
  rpgAssistantService = new RpgAssistantService('https://localhost:5051')
})

// --- Nodes --- //
const nodes = ref<CharacterNode[]>([
  new CharacterNode('a', 'Node A'),
  new CharacterNode('b', 'Node B'),
  new CharacterNode('c', 'Node C'),
])

// --- Sidebar state ---
const selectedNode = ref<CharacterNode | null>(null)
// Convert to object for v-network-graph
const nodesObject = Object.fromEntries(nodes.value.map((n) => [n.id, n]))

// --- Edges --- //
const edges = ref<KnowEdge[]>([new KnowEdge('edge1', 'a', 'b'), new KnowEdge('edge2', 'a', 'c')])
const edgesObject = Object.fromEntries(
  edges.value.map((e) => [e.id, { source: e.source, target: e.target }]),
)

// --- Event handlers --- //
const eventHandlers: vNG.EventHandlers = {
  'node:contextmenu': (node) => {
    const characterNode = nodes.value.find((n) => n.id === node.node) // lookup original instance
    console.log('Right-clicked node:', characterNode)
    selectedNode.value = characterNode ?? null
    console.log('End right click')
  },
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.graph {
  flex: 1;
  border-right: 1px solid #ccc;
}
</style>
