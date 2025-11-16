<template>
  <div>
    <p>{{ loc.notExistTitle }}</p>
  </div>
</template>
<script setup>
import {ComputedRef} from "vue";
import {useTranslation} from '@/core/index.js';

/**
 * @type {ComputedRef<Object>}
 */
const loc = useTranslation('modal');
</script>
