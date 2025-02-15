<script setup lang="ts">

useHead({
    title: 'Report',
});

</script>

<template>
    <div class="main-report" v-auto-animate>
        <div class="main-report_container">
            <div class="main-report_title">Отчет</div>
            <hr class="my-2.5 border-slate-500">
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-report {
    margin-top: 65px;
    &_container {
        padding: 20px;
    }
    &_title {
        font-size: 50px;
        margin: 0px 15px;
    }
}
</style>