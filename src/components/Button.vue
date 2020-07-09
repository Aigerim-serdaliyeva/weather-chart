<template>
    <button 
        class="button" 
        :class="{ active: isActive }"
        @click="selectedButton"
    >
        <slot />    
    </button>
</template>

<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        selectedButton() {
            this.isActive = true
        }
    }
}
</script>

<style lang="scss">
    .button {
        padding: 10px 15px;

        &.active {
            background: #c9df8a;
        }
    }
</style>