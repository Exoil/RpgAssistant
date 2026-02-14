<template>
  <div class="update-character-node-form">
    <input
      id="update-character-node-name-input"
      type="text"
      placeholder="Enter new name"
      v-model="characterData.name"
    />
    <br />
    <button id="update-character-node-submit-button" @click="onClickUpdateCharacter">Update</button>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, ref, watch} from 'vue';
import type { RpgAssistantService } from '@/services/RpgAssistantService';
import { Character } from '@/services/Models/Character.ts';
import {UpdateCharacter} from "@/services/Models/UpdateCharacter.ts";

const props = defineProps<{
  rpgAssistantService: RpgAssistantService;
  characterId: string | null;
}>();
let characterData = ref(new Character('', ''));
let version = ref(-1);
let controller: AbortController | null = null;
const emit = defineEmits<{
  (e: 'updated', characterData: Character): void;
}>();

async function onClickUpdateCharacter() {
  controller?.abort();
  controller = new AbortController();

  const signal = controller.signal;
  await props.rpgAssistantService.updateCharacterAsync(
    new UpdateCharacter(
      characterData.value.id,
      characterData.value.name,
      version.value),
    signal,
  );

  emit('updated', characterData.value);
}

async function loadCharacterById(id: string) {
  controller?.abort();
  controller = new AbortController();


  const dto = await props.rpgAssistantService.getCharacterAsync(id, controller.signal);
  console.log('version on onload ' +  dto.version);
  characterData.value.id = dto.id;
  characterData.value.name = dto.name;
  version.value = dto.version;
  console.log('version on onload assign ' + version!.value);
}


watch(
  () => props.characterId,
  async (id) => {
    if (!id)
      return;

    await loadCharacterById(id);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  controller?.abort();
});
</script>
