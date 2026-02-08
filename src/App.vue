<template>
  <div class="app">

    <div class = "create-character-node-form">
      <h3>Create character from</h3>
      <input id="create-character-node-name-input" type="text" placeholder="Enter new name" v-model="characterCreateName"/>
      <br/>
      <button id="create-character-node-submit-button" @click="onClickCreateCharacter">Create</button>
    </div>
   <!-- <v-network-graph :nodes="nodesObject" :edges="edgesObject" :event-handlers="eventHandlers" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import { CharacterNode } from '@/models/CharacterNode'
import { KnowEdge } from '@/models/KnowEdge'
import type * as vNG from 'v-network-graph'
import { RpgAssistantService } from './services/RpgAssistantService.ts'
import {PageQuery} from "@/services/Models/PageQuery.ts";
import {Character} from "@/services/Models/Character.ts";

let rpgAssistantService: RpgAssistantService;
let nodes: CharacterNode[];
const characterCreateName = ref('')

onBeforeMount(() => {
  rpgAssistantService = new RpgAssistantService('http://localhost:8080');
});

onMounted(async () => {
  console.log("start load characters")
  const controller = new AbortController()
  const signal = controller.signal
  let pageQuery = new PageQuery(1, 10, 'name', 'Asc');
  let result = await rpgAssistantService.getCharactersAsync(pageQuery, signal);
  nodes = result.map(c => new CharacterNode(c));
  console.log("Loaded characters")
})

async function onClickCreateCharacter(){
  const controller = new AbortController()
  const signal = controller.signal
  let createResult = await rpgAssistantService.createCharacterAsync(characterCreateName.value, signal);
  nodes.push(new CharacterNode(new Character(createResult, characterCreateName.value)));
}

/*
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
  */
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
