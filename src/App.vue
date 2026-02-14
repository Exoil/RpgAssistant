<template>
  <div class="app">
    <CreateCharacterComponent
      :rpgAssistantService="rpgAssistantService"
      @created="onCharacterCreated"
    />
    <v-network-graph
      :nodes="nodesForGraph"
      :edges="edgesForGraph"
      :configs="configs"
      :event-handlers="eventHandlers"
      v-model:selected-nodes="selectedNodeIds"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, computed, reactive} from 'vue'
import { CharacterNode } from '@/models/CharacterNode'
import { KnowEdge } from '@/models/KnowEdge'
import type * as vNG from 'v-network-graph'
import { RpgAssistantService } from './services/RpgAssistantService.ts'
import {PageQuery} from "@/services/Models/PageQuery.ts";
import {Character} from "@/services/Models/Character.ts";
import {defineConfigs, VNetworkGraph} from "v-network-graph";
import CreateCharacterComponent from "@/components/CreateCharacterComponent.vue";

let rpgAssistantService: RpgAssistantService;

const configs = reactive(vNG.getFullConfigs())


const markedNodeId = ref<string | null>(null)
const suppressNextViewClickClear = ref(false)
const selectedNodeIds = computed<string[]>({
  get() {
    return markedNodeId.value ? [markedNodeId.value] : []
  },
  set(ids) {
    const next = ids?.[0]

    if (!next) {
      return
    }
    markedNodeId.value = next
  },
})

const nodeList = ref<CharacterNode[]>([]);
const nodesForGraph = computed<vNG.Nodes>(() =>
  Object.fromEntries(
    nodeList.value.map((n) => [
      n.id,
      {
        name: n.name,
      },
    ])
  )
)
const edges = ref<KnowEdge[]>([]);
const edgesForGraph = computed<vNG.Edges>(() =>
Object.fromEntries(
  edges.value.map((e) => [
    e.source + e.target,
    {
      source: e.source,
      target: e.target,
    }
  ])
));

onBeforeMount(() => {
  rpgAssistantService = new RpgAssistantService('http://localhost:8080');
});

onMounted(async () => {
  console.log("start load characters")
  const controller = new AbortController()
  const signal = controller.signal
  let pageQuery = new PageQuery(1, 10, 'name', 'Asc');
  let result = await rpgAssistantService.getCharactersAsync(pageQuery, signal);
  nodeList.value = result.map((c) => new CharacterNode(c))
  nodeList.value.forEach(n => {
    n.characterData.knowCharacterIds.forEach(knowId => {
      edges.value.push(new KnowEdge(n.id, knowId))
    })
  })
  console.log("Loaded characters")
})

function onCharacterCreated(node: CharacterNode) {
  nodeList.value.push(node);
  markedNodeId.value = node.id
}

/*
// --- Edges --- //
const edges = ref<KnowEdge[]>([new KnowEdge('edge1', 'a', 'b'), new KnowEdge('edge2', 'a', 'c')])

const edgesObject = Object.fromEntries(
  edges.value.map((e) => [e.id, { source: e.source, target: e.target }]),
)
*/

// --- Event handlers --- //
const eventHandlers: vNG.EventHandlers = {
  "node:click": ({ node }) => {
    suppressNextViewClickClear.value = true
    markedNodeId.value = node
  },
  "node:pointerdown": ({ node, event }) => {
    // mark immediately on press
    markedNodeId.value = node

    // optional: stop the browser from doing text selection / dragging
    event.preventDefault()
  },
  "view:click": ({ event }) => {
    if (suppressNextViewClickClear.value) {
      suppressNextViewClickClear.value = false
      return
    }
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
