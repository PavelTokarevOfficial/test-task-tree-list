<template>
  <ul class="tree">
    <tree-item
        v-for="item in treeData"
        :key="item.id"
        :item="item"
        :itemsList="treeData"
        class="mb-3"
    />
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref} from 'vue';
import TreeItem from './TreeItem.vue';

interface TreeItemProps {
  id: string;
  locale: Record<string, { cg_name: string }>;
  childs?: TreeItemProps[];
  path_to_top?: string[];
}

const treeData = ref<TreeItemProps[]>([]);

const fetchData = async () => {
  try {
    const response = await fetch('/data.json');
    treeData.value = await response.json();
    console.log("tree", treeData.value)
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>