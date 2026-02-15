<template>
  <div class="app">
    <div>
      <h3> Create character</h3>
    <CreateCharacterComponent
      :rpgAssistantService="rpgAssistantService"
      @created="onCharacterCreated"
    />
    </div>

    <div>
      <h3>Delete character</h3>
      <DeleteCharacterComponent
        :rpgAssistantService="rpgAssistantService"
        :characterId="markedNodeId"
        @deleted="onCharacterDeleted"/>
    </div>

    <div>
      <h3> Update character</h3>
      <UpdateCharacterComponent
        :rpgAssistantService="rpgAssistantService"
        :characterId="markedNodeId"
        @updated="onCharacterUpdated"/>
    </div>

    <div>
      <h3>Delete know edge</h3>
      <DeleteKnowCharacterEdgeComponent
        :rpgAssistantService="rpgAssistantService"
        :edgeId="markedEdgeId"
        :edgeIdSeparator = EdgeIdSeparator
        @deletedKnowEdge="onEdgeKnowDeleted"
      />
    </div>

    <div>
      <h3>Create know edge</h3>
      <CreateCharacterKnowEdgeComponent
        :rpgAssistantService="rpgAssistantService"
        :fromNodeId="markedNodeId"
        :targetNodeId="markedNodeSecondId"
        :edgeIdSeparator = EdgeIdSeparator
        @createKnowEdge="onEdgeKnowCreated"/>
    </div>

    <v-network-graph
      :nodes="nodesForGraph"
      :edges="edgesForGraph"
      :configs="configs"
      :event-handlers="eventHandlers"
      v-model:selected-nodes="selectedNodeIds"
      v-model:selected-edges="selectedEdgeIds"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed, reactive } from 'vue';
import { CharacterNode } from '@/models/CharacterNode';
import { KnowEdge } from '@/models/KnowEdge';
import * as vNG from 'v-network-graph';
import { RpgAssistantService } from './services/RpgAssistantService.ts';
import { PageQuery } from '@/services/Models/PageQuery.ts';
import {type EdgeEvent, type NodeEvent, type ViewEvent, VNetworkGraph} from 'v-network-graph';
import CreateCharacterComponent from '@/components/CreateCharacterComponent.vue';
import DeleteCharacterComponent from "@/components/DeleteCharacterComponent.vue";
import UpdateCharacterComponent from "@/components/UpdateCharacterComponent.vue";
import type {VersionedCharacter} from "@/services/Models/VersionedCharacter.ts";
import DeleteKnowCharacterEdgeComponent from "@/components/DeleteKnowCharacterEdgeComponent.vue";
import CreateCharacterKnowEdgeComponent from "@/components/CreateCharacterKnowEdgeComponent.vue";

let rpgAssistantService: RpgAssistantService;

const EdgeIdSeparator = '_';
const configs = reactive(vNG.getFullConfigs());
const markedNodeId = ref<string | null>(null);
const markedNodeSecondId = ref<string | null>(null);
const markedEdgeId = ref<string | undefined>(undefined);
const suppressNextViewClickClear = ref(false);
const selectedNodeIds = computed<string[]>({
  get() {
    let selectedNodes = [];

    if (markedNodeId.value) {
      selectedNodes.push(markedNodeId.value);
    }
    if (markedNodeSecondId.value) {
      selectedNodes.push(markedNodeSecondId.value);
    }
    return selectedNodes;
  },
  set(ids) {
    const firstId = ids?.[0];

    const secondId = ids?.[1];

    if (firstId) {
      markedNodeId.value = firstId;
    }

    if (secondId) {
      markedNodeSecondId.value = secondId;
    }
  },
});

const selectedEdgeIds = computed<string[]>({
  get() {
    return markedEdgeId.value ? [markedEdgeId.value] : [];
  },
  set(ids) {
    const next = ids?.[0];

    if (!next) {
      return;
    }
    markedEdgeId.value = next;
  },
});

const nodeList = ref<CharacterNode[]>([]);
const nodesForGraph = computed<vNG.Nodes>(() =>
  Object.fromEntries(
    nodeList.value.map((n) => [
      n.id,
      {
        name: n.name,
      },
    ]),
  ),
);
const edges = ref<KnowEdge[]>([]);
const edgesForGraph = computed<vNG.Edges>(() =>
  Object.fromEntries(
    edges.value.map((e) => [
      e.source + EdgeIdSeparator + e.target,
      {
        source: e.source,
        target: e.target,
      },
    ]),
  ),
);

onBeforeMount(() => {
  rpgAssistantService = new RpgAssistantService('http://localhost:8080');
  SetupGraphConfig();
});

onMounted(async () => {
  console.log('start load characters');
  const controller = new AbortController();
  const signal = controller.signal;
  let pageQuery = new PageQuery(1, 10, 'name', 'Asc');
  let result = await rpgAssistantService.getCharactersAsync(pageQuery, signal);
  nodeList.value = result.map((c) => new CharacterNode(c));
  nodeList.value.forEach((n) => {
    n.characterData.knowCharacterIds.forEach((knowId) => {
      edges.value.push(new KnowEdge(n.id, knowId));
    });
  });
  console.log('Loaded characters');
});

function SetupGraphConfig() {
  configs.node.selectable = 2;
  configs.edge.selectable = 1;
  configs.edge.type = 'straight';
  configs.edge.marker.source.type = 'none';
  configs.edge.marker.target.type = 'arrow';
  configs.view.grid.visible = true;
  configs.view.grid.interval = 10;
  configs.view.grid.thickIncrements = 5;
  configs.view.grid.line.color = '#e0e0e0';
  configs.view.grid.line.width = 1;
  configs.view.grid.line.dasharray = 1;
  configs.view.grid.thick.color = '#cccccc';
  configs.view.grid.thick.width = 1;
  configs.view.grid.thick.dasharray = 0;
  configs.view.layoutHandler = new vNG.GridLayout({grid: 10});
}

function onCharacterCreated(node: CharacterNode) {
  nodeList.value.push(node);
  markedNodeId.value = node.id;
}

function onCharacterDeleted(id: string) {

  const idx = nodeList.value.findIndex((n) => n.id === id);

  if (idx === -1)
    return;

  nodeList.value.splice(idx, 1);
}

function onCharacterUpdated(updatedCharacter: VersionedCharacter) {

  const idx = nodeList.value.findIndex((n) => n.id === updatedCharacter.id);

  if (idx === -1)
    return;

  nodeList.value[idx]!.characterData.id = updatedCharacter.id;
  nodeList.value[idx]!.updateName(updatedCharacter.name);
}

function onEdgeKnowDeleted(deletedEdgeId: string) {
  const [fromId, toId] = deletedEdgeId.split(EdgeIdSeparator);
  const idx = edges.value.findIndex((n) => n.source === fromId && n.target === toId);

  if (idx === -1)
    return;

  edges.value.splice(idx, 1);
}

function onEdgeKnowCreated(deletedEdgeId: string) {
  const [fromId, toId] = deletedEdgeId.split(EdgeIdSeparator);
  const foundNodeIndex = nodeList.value.findIndex((n) => n.id === fromId);

  if (foundNodeIndex === -1)
    return;

  nodeList.value[foundNodeIndex]!.characterData.knowCharacterIds.push(toId!);
  edges.value.push(new KnowEdge(fromId!, toId!));
}

// --- Event handlers --- //
function nodeClickHandler(nodeEvents: NodeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  markedNodeId.value = nodeEvents.node;
}

function edgeClickHandler(edgeEvent: EdgeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  markedEdgeId.value = edgeEvent.edge;
}

function viewClickHandler(clickEvent: ViewEvent<MouseEvent>){
  if (suppressNextViewClickClear.value) {
    suppressNextViewClickClear.value = false;
    return;
  }
  markedEdgeId.value = undefined;
  markedNodeId.value = null;
  markedNodeSecondId.value = null;
}

function showContextMenu(element: HTMLElement, event: MouseEvent) {
  element.style.left = event.x + "px"
  element.style.top = event.y + "px"
  element.style.visibility = "visible"
  const handler = (event: PointerEvent) => {
    if (!event.target || !element.contains(event.target as HTMLElement)) {
      element.style.visibility = "hidden"
      document.removeEventListener("pointerdown", handler, { capture: true })
    }
  }
  document.addEventListener("pointerdown", handler, { passive: true, capture: true })
}

const eventHandlers: vNG.EventHandlers = {
  'node:click': nodeClickHandler,
  'edge:click': edgeClickHandler,
  'view:click': viewClickHandler,
};
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
