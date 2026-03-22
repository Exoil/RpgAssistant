<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import type { RpgAssistantService } from '@/services/RpgAssistantService';

const { rpgAssistantService, characterId } = defineProps<{
  rpgAssistantService: RpgAssistantService;
  characterId: string | null;
}>();
let controller: AbortController | null = null;
const emit = defineEmits<{
  (e: 'deletedCharacter', deletedCharacterId: string): void;
}>();

async function onClickDeleteCharacter() {
  controller?.abort();
  if (!characterId) return;

  controller = new AbortController();
  const signal = controller.signal;
  await rpgAssistantService.deleteCharacterAsync(characterId, signal);

  emit('deletedCharacter', characterId);
}

onBeforeUnmount(() => {
  controller?.abort();
});
</script>

<template>
  <div class="delete-character-form">
    <button id="delete-character-button" @click="onClickDeleteCharacter" :disabled="!characterId">
      Delete character
    </button>
  </div>
</template>