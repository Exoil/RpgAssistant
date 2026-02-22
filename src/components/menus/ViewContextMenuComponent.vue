<template>
  <div
    ref="viewMenu"
    class="dropdown context-dropdown"
    :class="{ 'is-active': isOpen }"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
  >
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <button class="dropdown-item" type="button" @click="onCreateClick">Create character</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as vNG from 'v-network-graph';

const viewMenu = ref<HTMLDivElement>();

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

const emit = defineEmits<{
  (e: 'openCreateCharacterDialog'): void;
}>();

function onCreateClick() {
  emit('openCreateCharacterDialog');
  hideMenu();
}

function showContextMenu(event: MouseEvent) {
  pos.value = { x: event.clientX, y: event.clientY };
  isOpen.value = true;

  if (outsidePointerHandler) {
    document.removeEventListener('pointerdown', outsidePointerHandler, { capture: true });
  }

  outsidePointerHandler = (e: PointerEvent) => {
    const el = viewMenu.value;
    if (!el) return;
    if (!e.target || !el.contains(e.target as Node)) hideMenu();
  };

  document.addEventListener('pointerdown', outsidePointerHandler, { passive: true, capture: true });
}

function showViewContextMenu(params: vNG.ViewEvent<MouseEvent>) {
  const { event } = params;
  event.stopPropagation();
  event.preventDefault();
  showContextMenu(event);
}

defineExpose({
  showViewContextMenu,
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

.context-dropdown button.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  border: 0;
  background: #ffffff;
  color: #111827;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.context-dropdown button.dropdown-item:hover {
  background: #f3f4f6;
}
</style>
