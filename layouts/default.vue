<template>
    <div class="page">
        <div class="page-sidebar">
            <slot name="sidebar" />
        </div>

        <div class="page-content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
@use "sass:color";

body {
    background-color: g.$background-color;
    color: g.$text-color;
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
}

h1, h2, strong {
    color: g.$text-color-strong;
}

a {
    color: g.$text-color-primary;

    transition: color g.$transition-delay;

    &:hover {
        color: color.scale(g.$text-color-primary, $blackness: 20%) ;
    }
}

.page {
    max-width: 60rem;
    margin: 0 auto;
    padding: 4rem 1rem;

    display: flex;
    flex-flow: row nowrap;
    gap: 1rem;
}

.page-sidebar {
    flex: 1;
}

.page-content {
    flex: 3 2;
}
</style>
