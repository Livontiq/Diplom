<script setup lang="ts">

useHead({
    title: 'Settings',
});

</script>

<template>
    <div class="main-settings" v-auto-animate>
        <div class="main-settings_container">
            <div class="main-settings_title">Настройки</div>
            <hr class="my-2.5 border-slate-500">
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-settings {
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