<script lang='ts' setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { useAuthStore } from '~/store/auth.store';
import { account } from '~/utils/appwrite';

const store = useAuthStore()
const router = useRouter()

useHead({
    title: 'Home',
})

onMounted(async() => {
    try {
        const user = await account.get()
        if(user) store.set(user)
    } catch (error) {
        router.push('/login')
    } finally {

    }
})
</script>

<template>
    <div class="default" v-auto-animate>
        <section :class="{header: store.isAuth}" v-if="store.isAuth">
            <LayoutHeader></LayoutHeader>   
        </section>
        <section :class="{main: store.isAuth}">
            <aside :class="{main_sidebar: store.isAuth}">
                <LayoutMenu v-if="store.isAuth"></LayoutMenu>
            </aside>
            <div class="main-container">
                <slot></slot>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.header{
        z-index: 100;
}
.main{
        height: 100vh;
        grid-template-columns: 1fr 6fr;
        display: grid;
        &_sidebar {
            margin-top: 65px;
            padding: 20px;
            background-color: var(--sidebar);
            color: var(--primary);
        }
    }
.main-container {
        overflow: hidden;
}
</style>