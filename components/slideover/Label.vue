<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    labelText: {
        type: String,
        default: '',
    }
})

</script>

<template>
    <div>
        <label class="text-lg" v-if="labelText">
            {{ labelText }}
        </label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>