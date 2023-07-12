<template>
    <div>
        <h2>{{ date }}</h2>
        <p><slot /></p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    date: string,
}>();
</script>
