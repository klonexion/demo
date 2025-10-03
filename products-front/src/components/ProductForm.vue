
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { api } from '../api/client'

const props = defineProps<{ companyId: string }>()
const emit = defineEmits<{ (e: 'created'): void }>()

const form = reactive({
  name: '',
  sku: '',
  price: 0,
  currency: 'MXN',
})

const error = ref<string | null>(null)
const loading = ref(false)

async function submit() {
  error.value = null
  loading.value = true
  try {
    if (!form.name || !form.sku || !form.price || !form.currency) {
      throw new Error('Todos los campos son obligatorios')
    }
    await api.createProduct({ ...form, companyId: props.companyId })
    Object.assign(form, { name: '', sku: '', price: 0, currency: 'MXN' })
    emit('created')
  } catch (e: any) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="border:1px solid #ddd; padding:16px; border-radius:12px;">
    <h2>Products</h2>
    <div v-if="error" style="color:#b00020; margin: 6px 0;">{{ error }}</div>
    <form @submit.prevent="submit" style="display:grid; gap:10px;">
      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.sku" placeholder="SKU" />
      <input v-model.number="form.price" placeholder="Price" type="number" step="0.01" min="0" />
      <input v-model="form.currency" placeholder="Currency (MXN, USD...)" />
      <button :disabled="loading" type="submit">
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
input { padding:8px 10px; border:1px solid #ccc; border-radius:8px; }
button { padding:8px 12px; border-radius:8px; border:1px solid #333; background:#111; color:#fff; cursor:pointer; }
button[disabled]{ opacity: .6; cursor: not-allowed; }
</style>
