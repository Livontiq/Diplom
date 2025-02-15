<script setup lang="ts">

useHead({
    title: 'Help',
});

</script>

<template>
    <div class="main-help" v-auto-animate>
        <div class="main-help_container">
            <div class="main-help_title">Поддержка</div>
            <hr class="my-2.5 border-slate-500">
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-help {
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