<script lang="ts" setup>
import { MENU_DATA } from './menu.data';
</script>

<template>
    <div>
        <NuxtLink class="menu" 
            v-for='item in MENU_DATA'
            :key='item.name'
            :to='item.url'
        >
            <Icon :name='item.icon' class="icon"/>
            <span>{{ item.name }}</span>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
    .menu {
        display: flex;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 5px;
        align-items: center;
        font-size: 1.5rem;
        transition: all 0.4s;
        &:hover {
            background-color: var(--primary);
            color: var(--sidebar);
        }
        .icon {
        margin-right: 0.75rem;
        }
    }  
</style>