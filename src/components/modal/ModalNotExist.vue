<template>
  <div>
    <p>{{ loc.notExistTitle }}</p>
  </div>
</template>
<script setup>
import useTranslation from '@/composable/translations';

const loc = useTranslation('modal');

</script>
