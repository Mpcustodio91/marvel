<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'quasar/src/css/index.sass'
import { ref } from 'vue'
import CartItems from './components/CartItems.vue'
import { useCart } from '@/composables/cart/useCart'

const { cartItemCount } = useCart()

const drawerRight = ref<boolean>(false)
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="$q.dark.isActive ? 'bg-secondary' : 'bg-primary text-white'">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          Quadrinhos da Marvel
        </q-toolbar-title>
        <q-btn flat @click="drawerRight = !drawerRight" round dense icon="shopping_cart">
          <q-badge color="secondary" floating>{{ cartItemCount }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer class="q-pa-md">
      <q-toolbar class="q-gutter-md q-items-center">
        <q-toolbar-title class="text-center text-subtitle2">
          Desenvolvido por Marcos Custodio
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container class="main-container">
      <q-drawer side="right" v-model="drawerRight" bordered :width="350" :breakpoint="500">
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <CartItems />
          </div>
        </q-scroll-area>
      </q-drawer>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.main-container {
  width: 70%;
  margin: 0 auto;
}
</style>
