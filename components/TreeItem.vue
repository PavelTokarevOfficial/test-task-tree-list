<template>
  <li class="tree-item">
    <div
        @click="toggleChildren"
        class="flex gap-2 items-center"
    >
      <NuxtLink :to="item.locale[selectedLang].link" class="flex flex-col">
        {{ nameItem }}
        <small class="text-gray-500">{{ breadcrumbs }}</small>
      </NuxtLink>


      <ChevronDownIcon v-if="item.childs" class="w-5 transition-transform duration-300" :class="{ 'rotate-180': showChildren }"/>
    </div>

    <ul v-if="showChildren">
      <tree-item
          v-for="(child, index) in item.childs"
          :key="index"
          :item="child"
          :items-list="itemsList"
          class="ml-5 mb-1"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import type { Language } from '../helpers/languages';

const selectedLang = inject<Language>('selectedLang');


const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  itemsList: {
    type: Array,
    required: true
  }
});


const showChildren = ref(false);
const toggleChildren = () => {
  showChildren.value = !showChildren.value;
};


const nameItem = computed(() => {
  const selectName = props.item.locale[selectedLang.value]?.cg_name;
  // если есть на выбранном языке
  if (selectName) {
    return selectName;
  } else {
    // если нет - ищем первый попавшийся
    for (const langKey in props.item.locale ) {
      const name = props.item.locale[langKey]?.cg_name;
      if (name) {
        return name;
      }
    }
  }
});

interface TreeItemProps {
  id: string;
  locale: Record<string, { cg_name: string }>;
  childs?: TreeItemProps[];
  path_to_top?: string[];
}

//поиск имени по id
function findItemNameById(id: string, items: TreeItemProps[]): string | undefined {
  for (const item of items) {
    if (item.id === id) {
      return item.locale[selectedLang.value]?.cg_name;
    }
    if (item.childs) {
      const name = findItemNameById(id, item.childs);
      if (name) return name;
    }
  }
  return undefined;
}


const breadcrumbs = computed(() => {
  return props.item.path_to_top
      ?.map((id: string) => findItemNameById(id, props.itemsList))
      .join(' > ') || '';
});
</script>