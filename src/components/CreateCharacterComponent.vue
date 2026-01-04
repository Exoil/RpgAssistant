<template>
  <div>
    <label :for="'name'"></label>
    <input
      :id="'name'"
      type="text"
      v-model="characterName"
      placeholder="Enter new name"/>
    <button @click="createCharacter">">
      Update
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { RpgAssistantService } from '@/services/RpgAssistantService'

const showForm = ref(true)
// ✅ define props correctly (TYPE ONLY)
const { rpgAssistantService} = defineProps<{
  rpgAssistantService: RpgAssistantService
}>();

const characterName = ref('');

let controller: AbortController | null = null;

const createCharacter = async () => {
  controller?.abort();
  controller = new AbortController();

  try{
    await rpgAssistantService.createCharacterAsync(
      characterName.value,
      controller.signal);
  }
  catch (err: any)
  {
    console.error('Failed update character name', err);
  }
  finally {
    characterName.value = '';
    showForm.value = false;
  }
}

onBeforeUnmount(() => {
  controller?.abort()
})
</script>
