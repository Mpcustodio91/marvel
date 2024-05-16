<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchComics } from '../../service/apiService'
import type { Comic } from './interface'
import { useCart } from '@/composables/cart/useCart'
import ModalInfoComic from '../ModalInfoComic.vue'
import { useQuasar } from 'quasar'

const comics = ref<Comic[]>([])
const comic = ref<Comic>()
const sort = ref<string>('')
const current = ref<number>(1)
const limit = ref<number>(10)
const searchTerm = ref('')
const showComic = ref<boolean>(false)
const visible = ref(false)
const $q = useQuasar()
const { addToCart } = useCart()

const fetchComicsData = async (page: number = 1, limit: number = 10, sort: string = '') => {
  visible.value = true
  try {
    const data = await fetchComics(page, limit, sort)
    comics.value = data
  } catch (error) {
    console.error('Erro ao carregar quadrinhos:', error)
  } finally {
    visible.value = false
  }
}

const filteredComics = computed(() => {
  return comics.value.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const search = () => {
  if (!searchTerm.value) {
    fetchComics()
  } else {
    comics.value = comics.value.filter((comic) =>
      comic.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
}

const setComic = (item: Comic) => {
  showComic.value = true
  comic.value = item
}

const loadPage = () => {
  fetchComicsData(current.value, limit.value, sort.value)
}

const addToCartAndShowToast = (item: Comic) => {
  addToCart(item)
  $q.notify({
    type: 'positive',
    message: 'Item adicionado ao carrinho.'
  })
}

fetchComicsData()
</script>
<template>
  <div class="container">
    <div class="col-12">
      <h4 class="q-ma-none text-uppercase q-mt-lg text-primary text-bold">Quadrinhos</h4>
    </div>
    <div class="col-lg-9 col-sm-8 col-xs-7 q-pa-md">
      <q-input
        ref="inputSearch"
        v-model="searchTerm"
        label="Digite o nome do quadrinho"
        @keyup.enter="search"
      >
        <template v-slot:after>
          <q-btn size="md" icon="search" color="primary" round @click="search" />
        </template>
      </q-input>
    </div>

    <div class="col-lg-3 col-sm-4 col-xs-5 flex flex-center content-center">
      <q-btn flat icon="filter_list" label="Ordernar Por">
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>
                <q-radio
                  keep-color
                  v-model="sort"
                  val="title"
                  label="Nome"
                  color="red"
                  @click="loadPage"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="limit">
      <q-select
        dense
        square
        outlined
        color="primary"
        v-model="limit"
        :options="[10, 20]"
        label="Itens por página"
        @update:model-value="loadPage()"
      />
    </div>
    <section class="col-12 row">
      <div
        class="col-sm-4 col-md-3 col-lg-3 col-xs-6 q-pa-sm q-mt-lg"
        v-for="comic in filteredComics"
        :key="comic.id"
      >
        <q-card>
          <q-img
            :ratio="1"
            contain
            transition="scale"
            :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
            alt="comic-img"
          />
          <q-card-section>
            <q-btn
              color="secondary"
              icon="shopping_cart"
              class="absolute text-white comic-title"
              size="md"
              @click="addToCartAndShowToast(comic)"
              round
            />
            <div class="row no-wrap items-center">
              <div class="col-12 full-width ellipsis">
                <q-btn
                  :label="comic.title"
                  flat
                  color="red"
                  class="full-width q-mt-md text-caption text-bold"
                  :class="[$q.dark.isActive ? 'text-white' : 'text-black']"
                  @click="setComic(comic)"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none"> </q-card-section>
        </q-card>
      </div>
    </section>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links @click="loadPage" />
    </div>
    <ModalInfoComic v-model="showComic" :show-modal="showComic" :comicItem="comic" />
    <q-inner-loading
      :showing="visible"
      label="Aguarde..."
      label-class="text-primary text-bold"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.limit {
  width: 200px;
  margin-top: 20px;
}

.my-card {
  width: 100%;
  max-width: 250px;
}
.comic-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
</style>
