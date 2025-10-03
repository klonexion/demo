
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { api } from '../api/client'
import type { Product } from '../types'

const props = defineProps<{ companyId: string }>()

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    products.value = await api.listProducts(props.companyId)
  } catch (e: any) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

async function remove(id: string) {
  if (!confirm('Delete product?')) return
  await api.deleteProduct(id)
  await load()
}

onMounted(load)
watch(() => props.companyId, load)
</script>

<template>
  <div style="border:1px solid #ddd; padding:16px; border-radius:12px;">
    <h2>Products</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color:#b00020;">{{ error }}</div>
    <table v-else style="width:100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align:left;">Name</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td style="text-align:center">{{ p.sku }}</td>
          <td style="text-align:right">{{ p.price.toFixed(2) }}</td>
          <td style="text-align:center">{{ p.currency }}</td>
          <td style="text-align:center">
            <button @click="remove(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
th, td { padding: 8px; border-bottom:1px solid #eee; }
button { padding:4px 10px; border-radius:8px; border:1px solid #333; background:#fff; cursor:pointer; }
</style>
