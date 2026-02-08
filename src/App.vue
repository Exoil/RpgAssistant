<template>
  <div class="app">
    <div class = "create-character-node-form">
      <h3>Create character from</h3>
      <input id="create-character-node-name-input" type="text" placeholder="Enter new name" v-model="characterCreateName"/>
      <br/>
      <button id="create-character-node-submit-button" @click="onClickCreateCharacter">Create</button>
    </div>
   <v-network-graph :nodes="nodesForGraph" :edges="edgesForGraph" :configs="configs" :event-handlers="eventHandlers" />
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onMounted, computed} from 'vue'
import { CharacterNode } from '@/models/CharacterNode'
import { KnowEdge } from '@/models/KnowEdge'
import type * as vNG from 'v-network-graph'
import { RpgAssistantService } from './services/RpgAssistantService.ts'
import {PageQuery} from "@/services/Models/PageQuery.ts";
import {Character} from "@/services/Models/Character.ts";
import {defineConfigs, VNetworkGraph} from "v-network-graph";

let rpgAssistantService: RpgAssistantService;
const configs = defineConfigs({
  edge: {
    type: "straight",
    marker: {
      source: { type: "none" },
      target: { type: "arrow", width: 6, height: 6 },
    },
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
))
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
  nodeList.value = result.map((c) => new CharacterNode(c))
  nodeList.value.forEach(n => {
    n.characterData.knowCharacterIds.forEach(knowId => {
      edges.value.push(new KnowEdge(n.id, knowId))
    })
  })
  console.log("Loaded characters")
})

async function onClickCreateCharacter(){
  const controller = new AbortController()
  const signal = controller.signal
  let createResult = await rpgAssistantService.createCharacterAsync(characterCreateName.value, signal);
  nodeList.value.push(new CharacterNode(new Character(createResult, characterCreateName.value)))
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
  'node:contextmenu': (node) => {
    console.log('node contextmenu, to do')
  }
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
