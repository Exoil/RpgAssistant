<template>
  <div class="create-character-node-form">
    <input
      id="create-character-node-name-input"
      type="text"
      placeholder="Enter new name"
      v-model="characterCreateName"
    />
    <br />
    <button id="create-character-node-submit-button" @click="onClickCreateCharacter">Create</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import type { RpgAssistantService } from '@/services/RpgAssistantService';
import { CharacterNode } from '@/models/CharacterNode.ts';
import { Character } from '@/services/Models/Character.ts';

const { rpgAssistantService } = defineProps<{
  rpgAssistantService: RpgAssistantService;
}>();
let controller: AbortController | null = null;
const characterCreateName = ref('');
const emit = defineEmits<{
  (e: 'characterCreated', node: CharacterNode): void;
}>();

async function onClickCreateCharacter() {
  controller?.abort();
  controller = new AbortController();

  const signal = controller.signal;
  let createResult = await rpgAssistantService.createCharacterAsync(
    characterCreateName.value,
    signal,
  );
  const node = new CharacterNode(new Character(createResult, characterCreateName.value));

  emit('characterCreated', node);
  characterCreateName.value = '';
}

onBeforeUnmount(() => {
  controller?.abort();
});
</script>
