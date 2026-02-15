<template>
  <div class="delete-character-form">
    <button id="delete-character-button" @click="onClickDeleteCharacter" :disabled="!characterId"> Delete character </button>
  </div>
</template>

<script setup lang="ts">
import type {RpgAssistantService} from "@/services/RpgAssistantService.ts";

const { rpgAssistantService, characterId } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  characterId: string | null;
}>();
let controller: AbortController | null = null;
const emitDeleteName = 'deletedCharacter';
const emit = defineEmits<{
  (e: 'deletedCharacter', deletedCharacterId: string): void;
}>();

async function onClickDeleteCharacter() {
  controller?.abort();
  if (!characterId)
    return;

  controller = new AbortController();
  const signal = controller.signal;
  await rpgAssistantService.deleteCharacterAsync(
    characterId,
    signal,
  );

  emit(emitDeleteName, characterId);
}

</script>

<style scoped></style>
