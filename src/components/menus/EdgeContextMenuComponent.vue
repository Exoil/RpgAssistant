<template>
  <div ref="edgeMenu" class="edge-context-menu">
    <DeleteKnowCharacterEdgeComponent
      :rpgAssistantService="rpgAssistantService"
      :edgeId="selectedEdgeId"
      :edgeIdSeparator="edgeIdSeparator"
      @deletedKnowEdge="onEdgeKnowDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as vNG from 'v-network-graph';
import type { RpgAssistantService } from '@/services/RpgAssistantService.ts';
import DeleteKnowCharacterEdgeComponent from '@/components/DeleteKnowCharacterEdgeComponent.vue';

const edgeMenu = ref<HTMLDivElement>();

let outsidePointerHandler: ((event: PointerEvent) => void) | null = null;

function hideMenu() {
  if (edgeMenu.value) {
    edgeMenu.value.style.visibility = 'hidden';
  }
  if (outsidePointerHandler) {
    document.removeEventListener('pointerdown', outsidePointerHandler, { capture: true });
    outsidePointerHandler = null;
  }
}

const { rpgAssistantService, selectedEdgeId, edgeIdSeparator } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  selectedEdgeId: string | undefined;
  edgeIdSeparator: string;
}>();

const emit = defineEmits<{
  (e: 'deleteKnowEdgeFromMenu', createdEdgeId: string): void;
}>();

function onEdgeKnowDeleted(createdEdgeId: string) {
  emit('deleteKnowEdgeFromMenu', createdEdgeId);
}

function showContextMenu(element: HTMLElement, event: MouseEvent) {
  element.style.left = event.x + 'px';
  element.style.top = event.y + 'px';
  element.style.visibility = 'visible';

  if (outsidePointerHandler) {
    document.removeEventListener('pointerdown', outsidePointerHandler, { capture: true });
  }

  outsidePointerHandler = (event: PointerEvent) => {
    if (!event.target || !element.contains(event.target as HTMLElement)) {
      hideMenu();
    }
  };

  document.addEventListener('pointerdown', outsidePointerHandler, { passive: true, capture: true });
}

function showEdgeContextMenu(params: vNG.EdgeEvent<MouseEvent>) {
  const { edge, event } = params;
  event.stopPropagation();
  event.preventDefault();

  if (edgeMenu.value) {
    showContextMenu(edgeMenu.value, event);
  }
}

defineExpose({
  showEdgeContextMenu,
  hideMenu, // optional: lets App.vue hide it too if needed
});
</script>

<style scoped>
.edge-context-menu {
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
