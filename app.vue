<template>
  <NuxtLayout>
    <div class="container mx-auto px-4">
      <Select class="mb-10 max-w-xs"/>
      <Tree/>
    </div>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { ref, provide } from 'vue'
import Select from '@/components/Select.vue'
import Tree from '@/components/Tree.vue'
import { defaultLanguages } from './helpers/languages'
import type { Language } from './helpers/languages'

const selected = ref<Language>(defaultLanguages)

provide('selectedLang', selected)
</script>