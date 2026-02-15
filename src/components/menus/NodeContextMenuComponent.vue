<template>
  <div ref="nodeMenu" class="node-context-menu">
    Menu for the nodes
    <button type="button" @click="onUpdateClick" :disabled="!firstSelectedCharacterId">
      Update node
    </button>
    <DeleteCharacterComponent
      :disabled="!firstSelectedCharacterId"
      :rpgAssistantService="rpgAssistantService"
      :characterId="firstSelectedCharacterId"
      @deletedCharacter="onCharacterDeleted"/>
    <CreateCharacterKnowEdgeComponent
      :rpgAssistantService="rpgAssistantService"
      :fromNodeId="firstSelectedCharacterId"
      :targetNodeId="secondSelectedCharacterId"
      :edgeIdSeparator = edgeIdSeparator
      @createKnowEdge="onEdgeKnowCreated"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import * as vNG from 'v-network-graph';
import type {RpgAssistantService} from "@/services/RpgAssistantService.ts";
import DeleteCharacterComponent from "@/components/DeleteCharacterComponent.vue";
import CreateCharacterKnowEdgeComponent from "@/components/CreateCharacterKnowEdgeComponent.vue";

const nodeMenu = ref<HTMLDivElement>();

let outsidePointerHandler: ((event: PointerEvent) => void) | null = null;

function hideMenu() {
  if (nodeMenu.value) {
    nodeMenu.value.style.visibility = "hidden";
  }
  if (outsidePointerHandler) {
    document.removeEventListener("pointerdown", outsidePointerHandler, { capture: true });
    outsidePointerHandler = null;
  }
}

const { rpgAssistantService, firstSelectedCharacterId, secondSelectedCharacterId } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  firstSelectedCharacterId: string | null;
  secondSelectedCharacterId: string | null;
  edgeIdSeparator: string;
}>();

const emit = defineEmits<{
  (e: 'openUpdateCharacterDialog'): void;
  (e: 'deletedCharacterFromMenu', deletedCharacterId: string): void;
  (e: 'createKnowEdgeFromMenu', createdEdgeId: string): void;
}>();

function onUpdateClick() {
  emit("openUpdateCharacterDialog");
  hideMenu();
}

function onCharacterDeleted(deletedCharacterId: string) {
  emit('deletedCharacterFromMenu', deletedCharacterId);
  hideMenu();
}

function onEdgeKnowCreated(createdEdgeId: string) {
  emit('createKnowEdgeFromMenu', createdEdgeId);
}

function showContextMenu(element: HTMLElement, event: MouseEvent) {
  element.style.left = event.x + "px";
  element.style.top = event.y + "px";
  element.style.visibility = "visible";

  if (outsidePointerHandler) {
    document.removeEventListener("pointerdown", outsidePointerHandler, { capture: true });
  }

  outsidePointerHandler = (event: PointerEvent) => {
    if (!event.target || !element.contains(event.target as HTMLElement)) {
      hideMenu();
    }
  };

  document.addEventListener("pointerdown", outsidePointerHandler, { passive: true, capture: true });
}

function showNodeContextMenu(params: vNG.NodeEvent<MouseEvent>) {
  const { node, event } = params;
  event.stopPropagation();
  event.preventDefault();

  if (nodeMenu.value) {
    showContextMenu(nodeMenu.value, event);
  }
}

defineExpose({
  showNodeContextMenu,
  hideMenu, // optional: lets App.vue hide it too if needed
});
</script>

<style scoped>
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
