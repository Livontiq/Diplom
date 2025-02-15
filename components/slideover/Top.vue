<script setup lang="ts">
import { useDealSlideStore } from '~/store/deal-slide.store';

const store = useDealSlideStore()
</script>

<template>
    <div class="slideovertop-main">
        <div class="slideovertop-main-container">
            <h1 class="font-bold text-4xl">О Заказе</h1>
            <SlideoverLabel label-text="Наименование:">
                <h2 class="title">
                    {{ store.deal?.name }}
                </h2>
            </SlideoverLabel>
            <SlideoverLabel label-text="Клиент:">
                <h2 class="title">
                    {{ store.deal?.customers.name }}
                </h2>
            </SlideoverLabel>
            <SlideoverLabel label-text="Дата:">
                <h2 class="title">
                    {{ store.deal?.date }}
                </h2>
            </SlideoverLabel>
        </div>
    </div>
</template>

<style scoped lang="scss">

.title {
    font-weight: 700;
}
</style>