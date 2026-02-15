<template>
  <div class="delete-know-edge-form">
    <button id="delete-know-edge-button" @click="onClickDeleteKnowEdge"> Delete know edge </button>
  </div>
</template>

<script setup lang="ts">
import type {RpgAssistantService} from "@/services/RpgAssistantService.ts";

const { rpgAssistantService, edgeId , edgeIdSeparator} = defineProps<{
  rpgAssistantService: RpgAssistantService;
  edgeId: string | undefined;
  edgeIdSeparator: string;
}>();
let controller: AbortController | null = null;
const emitDeleteName = 'deletedEdge';
const emit = defineEmits<{
  (e: 'deletedEdge', deletedEdgeId: string): void;
}>();

async function onClickDeleteKnowEdge() {
  controller?.abort();
  if (!edgeId)
    return;

  controller = new AbortController();
  const signal = controller.signal;
  const [fromId, toId] = edgeId.split(edgeIdSeparator);
  await rpgAssistantService.deleteKnowRelationBetweenCharacters(
    fromId!,
    toId!,
    signal,
  );

  emit(emitDeleteName, edgeId);
}
</script>

<style scoped></style>
