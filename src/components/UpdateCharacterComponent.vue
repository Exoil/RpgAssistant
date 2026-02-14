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
import {UpdateCharacter} from "@/services/Models/UpdateCharacter.ts";
import {VersionedCharacter} from "@/services/Models/VersionedCharacter.ts";

const props = defineProps<{
  rpgAssistantService: RpgAssistantService;
  characterId: string | null;
}>();
let characterData = ref(new VersionedCharacter('', '', ''));
let controller: AbortController | null = null;
const emit = defineEmits<{
  (e: 'updated', characterData: VersionedCharacter): void;
}>();

async function onClickUpdateCharacter() {
  controller?.abort();
  controller = new AbortController();

  const signal = controller.signal;
  await props.rpgAssistantService.updateCharacterAsync(
    new UpdateCharacter(
      characterData.value.id,
      characterData.value.name,
      characterData.value.version),
    signal,
  );

  emit('updated', characterData.value);
}

async function loadCharacterById(id: string) {
  controller?.abort();
  controller = new AbortController();

  const dto = await props.rpgAssistantService.getCharacterAsync(id, controller.signal);
  characterData.value.id = dto.id;
  characterData.value.name = dto.name;
  characterData.value.version = dto.version;
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
