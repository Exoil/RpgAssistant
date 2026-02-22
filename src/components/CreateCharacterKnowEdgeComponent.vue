<template>
  <div class="create-know-edge-form">
    <button
      id="create-know-edge-button"
      @click="onClickCreateKnowEdge"
      :disabled="!fromNodeId && !targetNodeId"
    >
      Create know edge
    </button>
  </div>
</template>

<script setup lang="ts">
import type { RpgAssistantService } from '@/services/RpgAssistantService.ts';

const { rpgAssistantService, fromNodeId, targetNodeId, edgeIdSeparator } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  fromNodeId: string | null;
  targetNodeId: string | null;
  edgeIdSeparator: string;
}>();
let controller: AbortController | null = null;
const emitDeleteName = 'createKnowEdge';
const emit = defineEmits<{
  (e: 'createKnowEdge', createdEdgeId: string): void;
}>();

async function onClickCreateKnowEdge() {
  controller?.abort();

  if (!fromNodeId || !targetNodeId) return;

  controller = new AbortController();
  const signal = controller.signal;
  await rpgAssistantService.createKnowRelationBetweenCharacters(
    fromNodeId,
    targetNodeId,
    '',
    signal,
  );

  const edgeId = fromNodeId + edgeIdSeparator + targetNodeId;
  emit(emitDeleteName, edgeId);
}
</script>

<style scoped>
#create-know-edge-button:disabled {
  background: #9ca3af; /* gray */
  color: #111827; /* near-black text */
  border-color: #6b7280;
  cursor: not-allowed;
  opacity: 1; /* keep solid color (some browsers dim disabled buttons) */
}
</style>
