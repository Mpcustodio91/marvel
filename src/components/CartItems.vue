<script setup lang="ts">
import { useCart } from '@/composables/cart/useCart'
import { useQuasar } from 'quasar'

const props = defineProps({
  msg: String
})

props.msg ? console.log(props.msg) : null

const $q = useQuasar()

const { cartItems, removeFromCart, cartTotal, decreaseQuantity, increaseQuantity, checkout } =
  useCart()

const checkoutAndShowNotify = () => {
  checkout()
  $q.notify({
    type: 'positive',
    message: 'Compra Realizada com sucesso.'
  })
}
</script>

<template>
  <div class="q-pa-sm">
    <q-list bordered class="items-center cart-container">
      <div v-for="(item, index) in cartItems" :key="index">
        <q-item>
          <q-item-section top>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-secondary text-uppercase"
            >
              <span class="cursor-pointer comic-title">{{ item.title }}</span>
            </q-item-label>
            <q-item-label>
              <div class="text-grey-8 q-gutter-xs q-item-section-content">
                <span class="text-primary text-weight-bold"
                  >Valor unitário R$: {{ item.price }}</span
                >
                <div class="float-right">
                  <q-btn
                    v-if="item.quantity > 1"
                    round
                    color="blue"
                    size="xs"
                    icon="remove"
                    @click="decreaseQuantity(item)"
                  />
                  <span class="q-mx-auto q-my-auto q-pa-xs">{{ item.quantity }}</span>
                  <q-btn round color="blue" size="xs" icon="add" @click="increaseQuantity(item)" />
                  <q-btn
                    round
                    color="primary"
                    size="xs"
                    con="delete"
                    icon="delete"
                    class="q-ml-xs"
                    @click="removeFromCart(item.id)"
                  />
                </div>
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
    </q-list>
    <div v-if="cartItems.length">
      <div class="total">Total: {{ cartTotal }}</div>
      <q-btn color="primary" label="Finalizar Compra" @click="checkoutAndShowNotify" />
    </div>
  </div>
</template>

<style scoped>
.comic-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
.cart-container {
  max-width: 320px; /* Defina a largura máxima do container do carrinho */
}
.total {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
