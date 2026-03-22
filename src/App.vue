<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed, reactive } from 'vue';
import { CharacterNode } from '@/models/CharacterNode';
import { KnowEdge } from '@/models/KnowEdge';
import * as vNG from 'v-network-graph';
import { RpgAssistantService } from '@/services/RpgAssistantService';
import { PageQuery } from '@/services/Models/PageQuery';
import { type EdgeEvent, type NodeEvent, type ViewEvent } from 'v-network-graph';
import type { VersionedCharacter } from '@/services/Models/VersionedCharacter';
import NodeContextMenuComponent from '@/components/menus/NodeContextMenuComponent.vue';
import EdgeContextMenuComponent from '@/components/menus/EdgeContextMenuComponent.vue';
import ViewContextMenuComponent from '@/components/menus/ViewContextMenuComponent.vue';
import CreateCharacterComponent from '@/components/CreateCharacterComponent.vue';
import UpdateCharacterComponent from '@/components/UpdateCharacterComponent.vue';

let rpgAssistantService: RpgAssistantService;
const viewMenuRef = ref<InstanceType<typeof ViewContextMenuComponent> | null>(null);
const nodeMenuRef = ref<InstanceType<typeof NodeContextMenuComponent> | null>(null);
const edgeMenuRef = ref<InstanceType<typeof EdgeContextMenuComponent> | null>(null);
const EdgeIdSeparator = '_';
const graphConfiguration = reactive(vNG.getFullConfigs());
const firstSelectedNodeId = ref<string | null>(null);
const secondSelectedNodeId = ref<string | null>(null);
const selectedEdgeId = ref<string | undefined>(undefined);
const suppressNextViewClickClear = ref(false);

const selectedNodeIds = computed<string[]>({
  get() {
    const selectedNodes = [];
    if (firstSelectedNodeId.value) {
      selectedNodes.push(firstSelectedNodeId.value);
    }
    if (secondSelectedNodeId.value) {
      selectedNodes.push(secondSelectedNodeId.value);
    }
    return selectedNodes;
  },
  set(ids) {
    const firstId = ids?.[0];
    const secondId = ids?.[1];
    if (firstId) {
      firstSelectedNodeId.value = firstId;
    }
    if (secondId) {
      secondSelectedNodeId.value = secondId;
    }
  },
});

const selectedEdgeIds = computed<string[]>({
  get() {
    return selectedEdgeId.value ? [selectedEdgeId.value] : [];
  },
  set(ids) {
    const next = ids?.[0];
    if (!next) {
      return;
    }
    selectedEdgeId.value = next;
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
  const apiUrl = import.meta.env.VITE_API_RPG_ASSISTANT_BASE_URL;
  rpgAssistantService = new RpgAssistantService(apiUrl);
  setupGraphConfig();
});

onMounted(async () => {
  const controller = new AbortController();
  const signal = controller.signal;
  const pageQuery = new PageQuery(1, 10, 'name', 'Asc');
  const result = await rpgAssistantService.getCharactersAsync(pageQuery, signal);
  nodeList.value = result.map((c) => new CharacterNode(c));
  nodeList.value.forEach((n) => {
    n.characterData.knowCharacterIds.forEach((knowId) => {
      edges.value.push(new KnowEdge(n.id, knowId));
    });
  });
});

function setupGraphConfig() {
  graphConfiguration.node.selectable = 2;
  graphConfiguration.edge.selectable = 1;
  graphConfiguration.edge.type = 'straight';
  graphConfiguration.edge.marker.source.type = 'none';
  graphConfiguration.edge.marker.target.type = 'arrow';
  graphConfiguration.view.grid.visible = true;
  graphConfiguration.view.grid.interval = 10;
  graphConfiguration.view.grid.thickIncrements = 5;
  graphConfiguration.view.grid.line.color = '#e0e0e0';
  graphConfiguration.view.grid.line.width = 1;
  graphConfiguration.view.grid.line.dasharray = 1;
  graphConfiguration.view.grid.thick.color = '#cccccc';
  graphConfiguration.view.grid.thick.width = 1;
  graphConfiguration.view.grid.thick.dasharray = 0;
  graphConfiguration.view.layoutHandler = new vNG.GridLayout({ grid: 10 });
}

const createDialogOpen = ref(false);
function openCreateDialog() {
  createDialogOpen.value = true;
}

function createDialogClose() {
  createDialogOpen.value = false;
}

const updateNodeCharacterNodeModal = ref(false);

function openUpdateDialog() {
  if (!firstSelectedNodeId.value) return;
  updateNodeCharacterNodeModal.value = true;
}

function updateDialogModalClose() {
  updateNodeCharacterNodeModal.value = false;
}

function onCharacterCreated(node: CharacterNode) {
  nodeList.value.push(node);
  firstSelectedNodeId.value = node.id;
  createDialogOpen.value = false;
}

function onCharacterDeleted(id: string) {
  const idx = nodeList.value.findIndex((n) => n.id === id);
  if (idx === -1) return;
  nodeList.value.splice(idx, 1);
}

function onCharacterUpdated(updatedCharacter: VersionedCharacter) {
  const idx = nodeList.value.findIndex((n) => n.id === updatedCharacter.id);
  if (idx === -1) return;
  nodeList.value[idx]!.characterData.id = updatedCharacter.id;
  nodeList.value[idx]!.updateName(updatedCharacter.name);
  updateNodeCharacterNodeModal.value = false;
}

function onEdgeKnowDeleted(deletedEdgeId: string) {
  const [fromId, toId] = deletedEdgeId.split(EdgeIdSeparator);
  const idx = edges.value.findIndex((n) => n.source === fromId && n.target === toId);
  if (idx === -1) return;
  edges.value.splice(idx, 1);
}

function onEdgeKnowCreated(createdEdgeId: string) {
  const [fromId, toId] = createdEdgeId.split(EdgeIdSeparator);
  const foundNodeIndex = nodeList.value.findIndex((n) => n.id === fromId);
  if (foundNodeIndex === -1) return;
  nodeList.value[foundNodeIndex]!.characterData.knowCharacterIds.push(toId!);
  edges.value.push(new KnowEdge(fromId!, toId!));
}

// --- Event handlers --- //
function nodeClickHandler(nodeEvents: NodeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  firstSelectedNodeId.value = nodeEvents.node;
}

function edgeClickHandler(edgeEvent: EdgeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  selectedEdgeId.value = edgeEvent.edge;
}

function viewClickHandler(_clickEvent: ViewEvent<MouseEvent>) {
  if (suppressNextViewClickClear.value) {
    suppressNextViewClickClear.value = false;
    return;
  }
  selectedEdgeId.value = undefined;
  firstSelectedNodeId.value = null;
  secondSelectedNodeId.value = null;
}

function showNodeContextMenu(params: NodeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  const clickedId = params.node;

  if (!firstSelectedNodeId.value) {
    firstSelectedNodeId.value = clickedId;
  } else if (firstSelectedNodeId.value === clickedId) {
  } else if (!secondSelectedNodeId.value) {
    secondSelectedNodeId.value = clickedId;
  } else if (secondSelectedNodeId.value === clickedId) {
  } else {
    secondSelectedNodeId.value = clickedId;
  }

  nodeMenuRef.value?.showNodeContextMenu(params);
}

function showEdgeContextMenu(params: EdgeEvent<MouseEvent>) {
  suppressNextViewClickClear.value = true;
  const clickedEdgeId = params.edge;
  if (!clickedEdgeId) {
    return;
  }
  selectedEdgeId.value = clickedEdgeId;
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

<template>
  <div class="app">
    <v-network-graph
      class="graph-host"
      :nodes="nodesForGraph"
      :edges="edgesForGraph"
      :configs="graphConfiguration"
      :event-handlers="eventHandlers"
      v-model:selected-nodes="selectedNodeIds"
      v-model:selected-edges="selectedEdgeIds"
    />
    <NodeContextMenuComponent
      ref="nodeMenuRef"
      :rpgAssistantService="rpgAssistantService"
      :firstSelectedCharacterId="firstSelectedNodeId"
      :secondSelectedCharacterId="secondSelectedNodeId"
      :edgeIdSeparator="EdgeIdSeparator"
      @openUpdateCharacterDialog="openUpdateDialog"
      @deletedCharacterFromMenu="onCharacterDeleted"
      @createKnowEdgeFromMenu="onEdgeKnowCreated"
    />
    <EdgeContextMenuComponent
      ref="edgeMenuRef"
      :rpgAssistantService="rpgAssistantService"
      :selectedEdgeId="selectedEdgeId"
      :edgeIdSeparator="EdgeIdSeparator"
      @deleteKnowEdgeFromMenu="onEdgeKnowDeleted"
    />
    <ViewContextMenuComponent ref="viewMenuRef" @openCreateCharacterDialog="openCreateDialog" />

    <CreateCharacterComponent
      :rpgAssistantService="rpgAssistantService"
      @characterCreated="onCharacterCreated"
      :open="createDialogOpen"
      @closeCreateCharacter="createDialogClose"
    />

    <UpdateCharacterComponent
      :rpgAssistantService="rpgAssistantService"
      :characterId="firstSelectedNodeId"
      :open="updateNodeCharacterNodeModal"
      @updatedCharacter="onCharacterUpdated"
      @closeUpdateCharacter="updateDialogModalClose"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.graph-host {
  flex: 1;
  background: #ffffff;
}
</style>
