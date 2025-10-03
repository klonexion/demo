
<script setup lang="ts">
import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import { ref } from 'vue'

const companyId = ref('company01')
const refreshKey = ref(0)
function onCreated() { refreshKey.value++ }
</script>

<template>
  <main style="max-width: 900px; margin: 24px auto; font-family: system-ui, sans-serif;">
    <h1>Products</h1>

    <section style="margin: 16px 0; display:flex; gap:8px; align-items:center;">
      <label>Company ID:</label>
      <input v-model="companyId" placeholder="companyId" style="padding:6px 10px; border:1px solid #ccc; border-radius:6px;" />
    </section>

    <section style="display:grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <ProductForm :company-id="companyId" @created="onCreated" />
      <ProductList :company-id="companyId" :key="refreshKey" />
    </section>
  </main>
</template>
