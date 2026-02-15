<template>
  <div ref="viewMenu" class="view-context-menu">
    <CreateCharacterComponent
      :rpgAssistantService="rpgAssistantService"
      @characterCreated="onCharacterCreated"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import * as vNG from 'v-network-graph';
import type {RpgAssistantService} from "@/services/RpgAssistantService.ts";
import CreateCharacterComponent from "@/components/CreateCharacterComponent.vue";
import {CharacterNode} from "@/models/CharacterNode.ts";

const viewMenu = ref<HTMLDivElement>();

let outsidePointerHandler: ((event: PointerEvent) => void) | null = null;

function hideMenu() {
  if (viewMenu.value) {
    viewMenu.value.style.visibility = "hidden";
  }
  if (outsidePointerHandler) {
    document.removeEventListener("pointerdown", outsidePointerHandler, { capture: true });
    outsidePointerHandler = null;
  }
}

const { rpgAssistantService} = defineProps<{
  rpgAssistantService: RpgAssistantService;
}>();

const emit = defineEmits<{
  (e: 'onCharacterCreatedFromViewMenu', node: CharacterNode): void;
}>();

function onCharacterCreated(node: CharacterNode) {
  emit('onCharacterCreatedFromViewMenu', node);
  hideMenu();
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

function showViewContextMenu(params: vNG.ViewEvent<MouseEvent>) {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();

  if (viewMenu.value) {
    showContextMenu(viewMenu.value, event);
  }
}

defineExpose({
  showViewContextMenu,
  hideMenu, // optional: lets App.vue hide it too if needed
});
</script>

<style scoped>
.view-context-menu {
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
