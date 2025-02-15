<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.store';
import { account } from '~/utils/appwrite';

// import { account } from '#imports';
// import { ref } from 'vue';
// import { vAutoAnimate } from '@formkit/auto-animate/vue'

const store = useAuthStore();
const router = useRouter();
const result = await account.get();
const isTooltipVisible = ref(false);
const isEditing = ref(false);
const editedName = ref(result.name);

const logout = async () => {
    await account.deleteSession('current');
    store.clear();
    await router.push('/login');
};

const saveChanges = async () => {
    try {
        await account.updateName(editedName.value); 
        result.name = editedName.value; 
        isEditing.value = false; 
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
    }
};

const cancelEdit = () => {
    editedName.value = result.name; 
    isEditing.value = false; 
};
</script>

<template>
    <div class="header">
        <div class="header-logo">
            <NuxtLink to="/">
                <img class="img" src="../../assets/logo2.svg" alt="logo" width="200px">
            </NuxtLink>
        </div>
        <div class="header-user" v-auto-animate>
            <div class="user text-lg" @mouseenter="isTooltipVisible = true" @mouseleave="isTooltipVisible = false">
                {{ result.email }}
                <div v-if="isTooltipVisible" class="tooltip">
                    <div v-auto-animate>
                        <div class="flex gap-1">
                            <div class="main-customer_form-inputs-title">Имя:</div>
                            <InputDisabled class="font-bold" v-if="!isEditing" >{{ result.name }}</InputDisabled>
                        </div>
                        <UiInput v-if="isEditing" class="input my-1" placeholder="Введите имя" v-model="editedName" type="name"></UiInput>
                    </div>
                    <div class="flex gap-1">
                        <div class="main-customer_form-inputs-title">Почта:</div>
                        <InputDisabled class="font-bold">{{ result.email }}</InputDisabled>
                    </div>
                    <div class="buttons">
                        <UiButton class="button" v-if="!isEditing" @click="isEditing = true">
                            Редактировать
                        </UiButton>
                        <UiButton class="button" v-if="isEditing" @click="saveChanges">
                            Сохранить
                        </UiButton>
                        <UiButton class="button" v-if="isEditing" @click="cancelEdit">
                            Отменить
                        </UiButton>
                    </div>
                </div>
            </div>
            <div class="logout">
                <button class="logout-button" @click="logout"><Icon name="line-md:logout" size="30" /></button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    height: 65px;
    background-color: var(--primary);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: absolute;
    &-user {
        display: flex;
        margin-top: 10px;
        .user {
            margin-right: 10px;
            cursor: pointer;
            .tooltip {
                cursor: auto;
                margin-left: -117px;
                margin-top: 10px;
                width: 300px;
                background-color: var(--primary);
                padding: 20px;
                position: absolute;
                pointer-events: all;
                animation-name: appearance;
                animation-duration: 0.5s;
                @keyframes appearance {
                    from {
                        margin-left: -200px;
                        opacity: 0;
                    }
                    to {
                        margin-left: -117px;
                        opacity: 1;
                    }
                }
            }
        }
        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            margin-top: 10px;
            .button {
                background-color: var(--sidebar);
                transition: all 0.2s;
                color: var(--primary);
                font-size: 15px;
                &:hover {
                    transform: scale(1.10);
                }
            }
        }
    }
}
.img {
    position: absolute;
    margin-top: -30px;
    margin-left: 20px;
}
.logout {
    &-button {
        transition: 0.2s;
        &:hover {
            color: var(--sidebar);
        }
    }
}
</style>
