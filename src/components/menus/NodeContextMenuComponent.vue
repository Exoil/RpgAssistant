<template>
  <div
    ref="nodeMenu"
    class="dropdown node-context-dropdown"
    :class="{ 'is-active': isOpen }"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
  >
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <button
          class="dropdown-item"
          type="button"
          @click="onUpdateClick"
          :disabled="!firstSelectedCharacterId"
        >
          Update character
        </button>

        <div class="dropdown-item">
          <DeleteCharacterComponent
            :disabled="!firstSelectedCharacterId"
            :rpgAssistantService="rpgAssistantService"
            :characterId="firstSelectedCharacterId"
            @deletedCharacter="onCharacterDeleted"
          />
        </div>

        <div class="dropdown-item">
          <CreateCharacterKnowEdgeComponent
            :rpgAssistantService="rpgAssistantService"
            :fromNodeId="firstSelectedCharacterId"
            :targetNodeId="secondSelectedCharacterId"
            :edgeIdSeparator="edgeIdSeparator"
            @createKnowEdge="onEdgeKnowCreated"
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
import DeleteCharacterComponent from '@/components/DeleteCharacterComponent.vue';
import CreateCharacterKnowEdgeComponent from '@/components/CreateCharacterKnowEdgeComponent.vue';

const nodeMenu = ref<HTMLDivElement>();

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

const {
  rpgAssistantService,
  firstSelectedCharacterId,
  secondSelectedCharacterId,
  edgeIdSeparator,
} = defineProps<{
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
  if (!firstSelectedCharacterId) return;
  emit('openUpdateCharacterDialog');
  hideMenu();
}

function onCharacterDeleted(deletedCharacterId: string) {
  emit('deletedCharacterFromMenu', deletedCharacterId);
  hideMenu();
}

function onEdgeKnowCreated(createdEdgeId: string) {
  emit('createKnowEdgeFromMenu', createdEdgeId);
  hideMenu();
}

function showContextMenu(event: MouseEvent) {
  pos.value = { x: event.clientX, y: event.clientY };
  isOpen.value = true;

  if (outsidePointerHandler) {
    document.removeEventListener('pointerdown', outsidePointerHandler, { capture: true });
  }

  outsidePointerHandler = (e: PointerEvent) => {
    const el = nodeMenu.value;
    if (!el) return;
    if (!e.target || !el.contains(e.target as Node)) hideMenu();
  };

  document.addEventListener('pointerdown', outsidePointerHandler, { passive: true, capture: true });
}

function showNodeContextMenu(params: vNG.NodeEvent<MouseEvent>) {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();
  showContextMenu(event);
}

defineExpose({
  showNodeContextMenu,
  hideMenu,
});
</script>

<style scoped>
.node-context-dropdown {
  position: fixed;
  z-index: 1000;
}

/* Menu panel background */
.node-context-dropdown .dropdown-content {
  background: #ffffff;
}

/* Default item look (fixes “black” item/text from inherited theme) */
.node-context-dropdown .dropdown-item {
  background: #ffffff;
  color: #111827; /* near-black text */
}

/* Hover */
.node-context-dropdown .dropdown-item:hover {
  background: #f3f4f6; /* light gray */
  color: #111827;
}

/* Divider */
.node-context-dropdown .dropdown-divider {
  background-color: #e5e7eb;
}

/* Disabled helper */
.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
