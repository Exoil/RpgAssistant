<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import type { RpgAssistantService } from '@/services/RpgAssistantService';

const { rpgAssistantService, edgeId, edgeIdSeparator } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  edgeId: string | undefined;
  edgeIdSeparator: string;
}>();
let controller: AbortController | null = null;
const emit = defineEmits<{
  (e: 'deletedKnowEdge', deletedEdgeId: string): void;
}>();

async function onClickDeleteKnowEdge() {
  controller?.abort();
  if (!edgeId) return;

  controller = new AbortController();
  const signal = controller.signal;
  const [fromId, toId] = edgeId.split(edgeIdSeparator);
  await rpgAssistantService.deleteKnowRelationBetweenCharacters(fromId!, toId!, signal);

  emit('deletedKnowEdge', edgeId);
}

onBeforeUnmount(() => {
  controller?.abort();
});
</script>

<template>
  <div class="delete-know-edge-form">
    <button id="delete-know-edge-button" @click="onClickDeleteKnowEdge">Delete know edge</button>
  </div>
</template>