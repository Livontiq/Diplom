<script setup lang="ts">
import { useDealSlideStore } from '~/store/deal-slide.store';

const store = useDealSlideStore()

const isLocalOpen = computed({
    get: () => store.isOpen,
    set: value => {
        store.isOpen = value
    }
})
</script>

<template>
    <div class="slideover-main">
        <div class="slideover-main-container">
            <USlideover v-model="isLocalOpen" class="slideover">
                <UCard class="slideover-card">
                    <template #header>
                        <SlideoverTop></SlideoverTop>
                    </template>
                </UCard>
                <UCard class="slideover-comments">
                    <SlideoverComments></SlideoverComments>
                </UCard>
            </USlideover>
        </div>
    </div>
</template>

<style scoped lang="scss">
.slideover-main {
    &-container {
    }
}
.slideover {
    &-card {
        margin: 75px 10px 0px 10px;
    }
    &-comments {
        margin: 10px;
    }
}

</style>