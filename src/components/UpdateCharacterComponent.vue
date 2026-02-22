<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update character node</p>
      </header>
      <section class="modal-card-body">
        <input
          class="input"
          id="update-character-node-name-input"
          type="text"
          placeholder="Enter new name"
          v-model="characterData.name"
        />
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button
            class="button is-light"
            id="update-character-node-submit-button"
            @click="onClickUpdateCharacter"
          >
            Update
          </button>
          <button class="button is-ghost" @click="onClickCancel">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import type { RpgAssistantService } from '@/services/RpgAssistantService';
import { UpdateCharacter } from '@/services/Models/UpdateCharacter.ts';
import { VersionedCharacter } from '@/services/Models/VersionedCharacter.ts';

const props = defineProps<{
  rpgAssistantService: RpgAssistantService;
  characterId: string | null;
  open: boolean;
}>();
let characterData = ref(new VersionedCharacter('', '', ''));
let controller: AbortController | null = null;
const emit = defineEmits<{
  (e: 'closeUpdateCharacter'): void;
  (e: 'updatedCharacter', characterData: VersionedCharacter): void;
}>();

async function onClickUpdateCharacter() {
  controller?.abort();
  controller = new AbortController();

  const signal = controller.signal;
  await props.rpgAssistantService.updateCharacterAsync(
    new UpdateCharacter(
      characterData.value.id,
      characterData.value.name,
      characterData.value.version,
    ),
    signal,
  );

  emit('updatedCharacter', characterData.value);
  emit('closeUpdateCharacter');
}

async function onClickCancel() {
  emit('closeUpdateCharacter');
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
    if (!id) return;

    await loadCharacterById(id);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  controller?.abort();
});
</script>
