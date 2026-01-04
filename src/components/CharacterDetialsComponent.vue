<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import type { RpgAssistantService } from '@/services/RpgAssistantService'
import type {Character} from "@/services/Models/Character.ts";

// ✅ define props correctly (TYPE ONLY)
const { rpgAssistantService, characterId } = defineProps<{
  rpgAssistantService: RpgAssistantService
  characterId: string
}>()

const character = ref<Character | null>(null)

let controller: AbortController | null = null

watch(
  () => characterId,
  async (id) => {
    // cancel previous request
    controller?.abort()

    controller = new AbortController()

    try {
      character.value =
        await rpgAssistantService.getCharacterAsync(id, controller.signal)
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Failed to load character', err)
      }
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  controller?.abort()
})
</script>
