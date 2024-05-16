import { ref, computed } from 'vue'
import type { CartItem } from './interface'
import type { Comic } from '@/components/comics/interface'

const cartItems = ref<CartItem[]>([])

function addToCart(item: Comic) {
  const existingItem = cartItems.value.find((cartItem) => cartItem.id === item.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      id: item.id,
      title: item.title,
      price: item.prices[0].price,
      quantity: 1
    })
  }
}

function increaseQuantity(itemId: CartItem) {
  const item = cartItems.value.find((item) => item.id === itemId.id)
  if (item) {
    item.quantity++
  }
}
function formatCurrency(value: any) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function decreaseQuantity(itemId: CartItem) {
  const item = cartItems.value.find((item) => item.id === itemId.id)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

function removeFromCart(itemId: number) {
  const index = cartItems.value.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}

function checkout() {
  cartItems.value = []
}

const cartTotal = computed(() => {
  const total = cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  return formatCurrency(parseFloat(total.toFixed(2)))
})

const cartItemCount = computed(() => {
  console.log(cartItems.value.length)
  return cartItems.value.length
})
export const useCart = () => {
  return {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
    cartTotal,
    cartItemCount
  }
}
