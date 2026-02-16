<template>
  <div
    ref="edgeMenu"
    class="dropdown context-dropdown"
    :class="{ 'is-active': isOpen }"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
  >
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div class="dropdown-item">
          <DeleteKnowCharacterEdgeComponent
            :rpgAssistantService="rpgAssistantService"
            :edgeId="selectedEdgeId"
            :edgeIdSeparator="edgeIdSeparator"
            @deletedKnowEdge="onEdgeKnowDeleted"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as vNG from 'v-network-graph';
import type { RpgAssistantService } from '@/services/RpgAssistantService.ts';
import DeleteKnowCharacterEdgeComponent from '@/components/DeleteKnowCharacterEdgeComponent.vue';

const edgeMenu = ref<HTMLDivElement>();

const isOpen = ref(false);
const pos = ref({ x: 0, y: 0 });

let outsidePointerHandler: ((event: PointerEvent) => void) | null = null;

function hideMenu() {
  isOpen.value = false;

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
  hideMenu();
}

function showContextMenu(event: MouseEvent) {
  pos.value = { x: event.clientX, y: event.clientY };
  isOpen.value = true;

  if (outsidePointerHandler) {
    document.removeEventListener('pointerdown', outsidePointerHandler, { capture: true });
  }

  outsidePointerHandler = (e: PointerEvent) => {
    const el = edgeMenu.value;
    if (!el) return;
    if (!e.target || !el.contains(e.target as Node)) hideMenu();
  };

  document.addEventListener('pointerdown', outsidePointerHandler, { passive: true, capture: true });
}

function showEdgeContextMenu(params: vNG.EdgeEvent<MouseEvent>) {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();
  showContextMenu(event);
}

defineExpose({
  showEdgeContextMenu,
  hideMenu,
});
</script>

<style scoped>
.context-dropdown {
  position: fixed;
  z-index: 1000;
}

.context-dropdown .dropdown-menu {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 12rem;
}

.context-dropdown.is-active .dropdown-menu {
  display: block;
}

.context-dropdown .dropdown-content {
  background: #ffffff;
  border: 1px solid rgba(10, 10, 10, 0.12);
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.18);
  padding: 0.25rem 0;
}

.context-dropdown .dropdown-item {
  background: #ffffff;
  color: #111827;
  padding: 0.5rem 0.75rem;
  cursor: pointer; /* optional: makes it feel like a menu row */
}

.context-dropdown .dropdown-item:hover {
  background: #f3f4f6; /* light gray */
  color: #111827;
}
</style>
