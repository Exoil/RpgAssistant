<script setup lang="ts">
import * as vNG from 'v-network-graph';
import type { RpgAssistantService } from '@/services/RpgAssistantService';
import DeleteCharacterComponent from '@/components/DeleteCharacterComponent.vue';
import CreateCharacterKnowEdgeComponent from '@/components/CreateCharacterKnowEdgeComponent.vue';
import { useContextMenu } from '@/composables/useContextMenu';

const { menuEl, isOpen, pos, showContextMenu, hideMenu } = useContextMenu();

const props = defineProps<{
  rpgAssistantService: RpgAssistantService;
  firstSelectedCharacterId: string | null;
  secondSelectedCharacterId: string | null;
  edgeIdSeparator: string;
}>();

const emit = defineEmits<{
  openUpdateCharacterDialog: [];
  openFindPathDialog: [];
  deletedCharacterFromMenu: [deletedCharacterId: string];
  createKnowEdgeFromMenu: [createdEdgeId: string];
}>();

function onUpdateClick() {
  if (!props.firstSelectedCharacterId) return;
  emit('openUpdateCharacterDialog');
  hideMenu();
}

function onFindPathClick() {
  if (!props.firstSelectedCharacterId) return;
  emit('openFindPathDialog');
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

<template>
  <!-- Teleport to <body> so `position: fixed` resolves against the viewport.
       Inside Foundry's ApplicationV2 window the window root has a
       `transform: translate(...)`, which makes any descendant fixed-position
       element snap to the window's origin instead of the viewport — the menu
       would land at the cursor *offset by the window's top-left*. Moving the
       menu out of the transformed subtree restores normal fixed positioning,
       so `event.clientX/Y` from v-network-graph match the rendered location.

       The outer `.rpg-assistant` wrapper is required because the Foundry
       build prefixes every scoped selector with `.rpg-assistant ` (see
       vite.config.foundry.ts → cssPrefixPlugin). Without an ancestor
       carrying that class, none of the menu styles match and the dropdown
       renders unstyled / invisible. -->
  <Teleport to="body">
  <div class="rpg-assistant">
  <div
    ref="menuEl"
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

        <button
          id="node-context-find-path-button"
          class="dropdown-item"
          type="button"
          @click="onFindPathClick"
          :disabled="!firstSelectedCharacterId"
        >
          Search path to
        </button>

        <div class="dropdown-item dropdown-item--embedded">
          <DeleteCharacterComponent
            :disabled="!firstSelectedCharacterId"
            :rpgAssistantService="rpgAssistantService"
            :characterId="firstSelectedCharacterId"
            @deletedCharacter="onCharacterDeleted"
          />
        </div>

        <div class="dropdown-item dropdown-item--embedded">
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
  </div>
  </Teleport>
</template>

<style scoped>
.node-context-dropdown {
  position: fixed;
  z-index: 1000;
}

.node-context-dropdown .dropdown-content {
  background: #ffffff;
}

.node-context-dropdown .dropdown-item {
  background: #ffffff;
  color: #111827;
}

.node-context-dropdown .dropdown-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.node-context-dropdown .dropdown-divider {
  background-color: #e5e7eb;
}

/* Items whose action lives in a child component (DeleteCharacter,
   CreateCharacterKnowEdge) used to inherit `.dropdown-item` padding from the
   wrapper *and* render a raw browser button inside it — net result was a
   narrow, off-centre control. Zero the wrapper's padding/margin and pin the
   inner button to fill the row with the same padding the plain dropdown-item
   buttons get, so every menu row looks identical. */
.node-context-dropdown .dropdown-item--embedded {
  padding: 0;
}

.node-context-dropdown .dropdown-item--embedded > :deep(*) {
  margin: 0;
}

.node-context-dropdown .dropdown-item--embedded :deep(button) {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.375rem 1rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.node-context-dropdown .dropdown-item--embedded :deep(button:hover:not(:disabled)) {
  background: #f3f4f6;
}

.node-context-dropdown .dropdown-item--embedded :deep(button:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
