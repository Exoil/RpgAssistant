<template>
  <div>
    <label :for="'name-'+ character?.id"></label>
    <input
      :id="'name-'+ character?.id"
      type="text"
      v-model="characterName"
      placeholder="Enter new name"/>
    <button @click="updateCharacterData">">
      Update
    </button>
    <button @click="deleteCharacterData">">
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import type { RpgAssistantService } from '@/services/RpgAssistantService'
import {UpdateCharacter} from "@/services/Models/UpdateCharacter.ts";
import type {VersionedCharacter} from "@/services/Models/VersionedCharacter.ts";

// ✅ define props correctly (TYPE ONLY)
const { rpgAssistantService, characterId } = defineProps<{
  rpgAssistantService: RpgAssistantService
  characterId: string
}>();

const characterName = ref('');

const character = ref<VersionedCharacter | null>();

let controller: AbortController | null = null;

const updateCharacterData = async () => {
  if (!character){
    return
  }

  controller?.abort();
  controller = new AbortController();

  try{
    await rpgAssistantService.updateCharacterAsync(
      new UpdateCharacter(character.value!.id, characterName.value, character.value!.version),
      controller.signal)
  }
  catch (err: any)
  {
    console.error('Failed update character name', err);
  }
}

const deleteCharacterData = async () => {
  if (!character){
    return
  }

  controller?.abort();
  controller = new AbortController();

  try{
    await rpgAssistantService.deleteCharacterAsync(
      character.value!.id,
      controller.signal)
  }
  catch (err: any)
  {
    console.error('Failed update character name', err);
  }
}

watch(
  () => characterId,
  async (id) => {
    // cancel previous request
    controller?.abort();

    controller = new AbortController();

    try {
      character.value =
        await rpgAssistantService.getCharacterAsync(id, controller.signal);
      characterName.value = character.value.name;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Failed to load character', err);
      }
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  controller?.abort()
})
</script>
