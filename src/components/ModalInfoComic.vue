<template>
  <q-dialog v-model="internalShowModal">
    <div class="col-sm-4 col-md-3 col-lg-3 col-xs-6 q-pa-sm q-mt-lg">
      <q-card class="my-card">
        <q-img
          :ratio="1"
          fit="contain"
          transition="scale"
          :src="props.comicItem?.thumbnail.path + '.' + props.comicItem?.thumbnail.extension"
        />

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-mt-md q-mb-sm">{{ props.comicItem?.title }}</div>
          <div class="text-caption text-grey">
            {{ props.comicItem?.description }}
          </div>
          <div class="text-caption text-grey">
            <span class="text-weight-bold text-primary text-uppercase">Preço:</span> ${{
              props.comicItem?.prices[0].price
            }}
          </div>
          <div class="text-caption text-grey">
            <span class="text-weight-bold text-primary text-uppercase"> Criadores: </span>
            <span v-for="creator in props.comicItem?.creators.items" :key="creator.resourceURI">
              {{ creator.name
              }}{{ !isLastItem(creator, props.comicItem?.creators.items) ? ', ' : '' }}
            </span>
          </div>
          <div class="text-caption text-grey">
            <span class="text-weight-bold text-primary text-uppercase"> Personagens: </span>
            <span
              v-for="character in props.comicItem?.characters.items"
              :key="character.resourceURI"
            >
              {{ character.name
              }}{{ !isLastItem(character, props.comicItem?.characters.items) ? ', ' : '' }}
            </span>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Fechar" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  showModal: Boolean,
  comicItem: Object
})
const internalShowModal = ref(props.showModal)
const emit = defineEmits(['update:showModal'])

// Método para fechar o modal
const closeDialog = () => {
  emit('update:showModal', false)
}

// Método para verificar se o item é o último na lista
const isLastItem = (item: any, list: any[]) => {
  return item === list[list.length - 1]
}
</script>

<style scoped>
.my-card {
  width: 100%;
  min-width: 400px;
  max-width: 500px;
}
</style>
