<template>
  <div>
    <p>{{ loc.notExistTitle }}</p>
  </div>
</template>
<script setup>
import useTranslation from '@/core/composable/useTranslation.js';

const loc = useTranslation('modal');

</script>
