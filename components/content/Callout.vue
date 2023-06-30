<template>
    <div class="callout">
        <strong>{{ title }}</strong>
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    kind: "note" | "warning" | "abstract" | "tip",
    title?: string,
}>();

const title = computed(() => props.title ? props.title : props.kind.toUpperCase());
</script>

<style lang="scss">
@use "sass:color";

.callout {
    background-color: g.$primary-light;

    border: 2px solid g.$primary;
    border-radius: g.$border-radius;

    padding: 1rem;

    transition: background-color g.$transition-delay;

    &:hover {
        background-color: color.adjust(g.$primary-light, $lightness: -10%);
    }
}
</style>
