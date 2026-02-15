<template>
  <div ref="viewMenu" class="view-context-menu">
    <button type="button" @click="onCreateClick">
      Create node…
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import * as vNG from 'v-network-graph';

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

const emit = defineEmits<{
  (e: 'openCreateCharacterDialog'): void;
}>();

function onCreateClick() {
  emit("openCreateCharacterDialog");
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
