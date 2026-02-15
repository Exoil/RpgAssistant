<template>
  <div class="app">
      <v-network-graph
        :nodes="nodesForGraph"
        :edges="edgesForGraph"
        :configs="configs"
        :event-handlers="eventHandlers"
        v-model:selected-nodes="selectedNodeIds"
        v-model:selected-edges="selectedEdgeIds"
      />
      <NodeContextMenuComponent
        ref="nodeMenuRef"
        :rpgAssistantService="rpgAssistantService"
        :firstSelectedCharacterId="markedNodeId"
        :secondSelectedCharacterId="markedNodeSecondId"
        :edgeIdSeparator = "EdgeIdSeparator"
        @updatedCharacterFromMenu="onCharacterUpdated"
        @deletedCharacterFromMenu="onCharacterDeleted"
        @createKnowEdgeFromMenu="onEdgeKnowCreated"
        />
      <EdgeContextMenuComponent
        ref="edgeMenuRef"
        :rpgAssistantService="rpgAssistantService"
        :selectedEdgeId="markedEdgeId"
        :edgeIdSeparator = "EdgeIdSeparator"
        @deleteKnowEdgeFromMenu="onEdgeKnowDeleted"
        />
      <ViewContextMenuComponent
        ref="viewMenuRef"
        :rpgAssistantService="rpgAssistantService"
        @onCharacterCreatedFromViewMenu="onCharacterCreated"
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
import type {VersionedCharacter} from "@/services/Models/VersionedCharacter.ts";
import NodeContextMenuComponent from "@/components/menus/NodeContextMenuComponent.vue";
import EdgeContextMenuComponent from "@/components/menus/EdgeContextMenuComponent.vue";
import ViewContextMenuComponent from "@/components/menus/ViewContextMenuComponent.vue";

let rpgAssistantService: RpgAssistantService;
const viewMenuRef = ref<InstanceType<typeof ViewContextMenuComponent> | null>(null);
const nodeMenuRef = ref<InstanceType<typeof NodeContextMenuComponent> | null>(null);
const edgeMenuRef = ref<InstanceType<typeof EdgeContextMenuComponent> | null>(null);
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

function showNodeContextMenu(params: NodeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  const clickedId = params.node;

  if (!markedNodeId.value) {
    markedNodeId.value = clickedId;
  } else if (markedNodeId.value === clickedId) {
  } else if (!markedNodeSecondId.value) {
    markedNodeSecondId.value = clickedId;
  } else if (markedNodeSecondId.value === clickedId) {
  } else {
    markedNodeSecondId.value = clickedId;
  }

  nodeMenuRef.value?.showNodeContextMenu(params);
}

function showEdgeContextMenu(params: EdgeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;

  const clickedEdgeId = params.edge;
  if (!clickedEdgeId) {
    return;
  }

  markedEdgeId.value = clickedEdgeId;

  edgeMenuRef.value?.showEdgeContextMenu(params);
}

function showViewContextMenu(params: vNG.ViewEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  viewMenuRef.value?.showViewContextMenu(params);
}



const eventHandlers: vNG.EventHandlers = {
  'node:click': nodeClickHandler,
  'edge:click': edgeClickHandler,
  'view:click': viewClickHandler,
  'node:contextmenu': showNodeContextMenu,
  'edge:contextmenu': showEdgeContextMenu,
  'view:contextmenu': showViewContextMenu,
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

.node-context-menu {
  width: 180px;
  background-color: #efefef;
  padding: 10px;
  position: fixed;
  visibility: hidden;
  font-size: 12px;
  border: 1px solid #aaa;
  box-shadow: 2px 2px 2px #aaa;
}
</style>
