<script setup lang="ts">
import { ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { DB_ID, COLLECTION_DEALS, COLLECTION_TYPES, COLLECTION_AUTHORS, COLLECTION_CUSTOMERS } from '~/app.constants';
import { ID } from 'appwrite';
import { DB } from '~/utils/appwrite';

const props = defineProps({
    refetch: {
        type: Function,
    }
})

interface IDealFormState {
    name: string;
    price: number;
    quantity: number;
    types: string;
    authors: string;
    customers: string;
    date: string;
    status?: string;
}

const isFormOpen = ref(false);
const form = ref<IDealFormState>({
    name: '',
    price: 0,
    quantity: 0,
    types: '',
    authors: '',
    customers: '',
    date: '',
});

const { data: types } = useQuery({
    queryKey: ['types'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_TYPES),
});

const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_AUTHORS),
});

const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});

const toggleForm = () => {
    isFormOpen.value = !isFormOpen.value;
};

const { mutate, isPending } = useMutation({
    mutationKey: ['createDeal'],
    mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, ID.unique(), data),
    onSuccess: () => {
        props.refetch && props.refetch()
        form.value = {
            name: '',
            price: 0,
            quantity: 0,
            types: '',
            authors: '',
            customers: '',
            date: '',
        };
    },
    onError: (error) => {
      console.error('Ошибка при отправке данных:', error);
    },
});

const onSubmit = () => {
    console.log('Отправляемые данные:', form.value); // Логируем данные перед отправкой
    mutate(form.value);
};
</script>

<template>
    <div class="createdeal-main" v-auto-animate>
        <div class="createdeal-main_container">
            <button @click="toggleForm">
                <Icon :class="['icon', {flipped: isFormOpen}]" name="ooui:add"></Icon>
            </button>
            <form class="createdeal-main_form" v-if="isFormOpen" @submit.prevent="onSubmit">
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Наименование:</div>
                    <UiInput class="input" placeholder="Введите наименование" id="name" v-model="form.name" required type="text" />
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Тип:</div>
                    <UiSelect id="types" v-model="form.types" required>
                        <UiSelectTrigger class="select">
                            <UiSelectValue placeholder="Выберите тип" />
                        </UiSelectTrigger>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem v-for="type in types?.documents" :key="type.$id" :value="type.$id">
                                    {{ type.name }}
                                </UiSelectItem>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Автор:</div>
                    <UiSelect id="authors" v-model="form.authors" required>
                        <UiSelectTrigger class="select">
                            <UiSelectValue placeholder="Выберите автора" />
                        </UiSelectTrigger>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem v-for="author in authors?.documents" :key="author.$id" :value="author.$id">
                                    {{ author.name }}
                                </UiSelectItem>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Клиент:</div>
                    <UiSelect id="customers" v-model="form.customers" required>
                        <UiSelectTrigger class="select">
                            <UiSelectValue placeholder="Выберите клиента" />
                        </UiSelectTrigger>
                        <UiSelectContent>
                            <UiSelectGroup>
                                <UiSelectItem v-for="customer in customers?.documents" :key="customer.$id" :value="customer.$id">
                                    {{ customer.name }}
                                </UiSelectItem>
                            </UiSelectGroup>
                        </UiSelectContent>
                    </UiSelect>
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Цена:</div>
                    <UiInput class="input" placeholder="Введите цену" type="number" id="price" v-model="form.price" required />
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Количество:</div>
                    <UiInput class="input" placeholder="Введите количество" type="number" id="quantity" v-model="form.quantity" required />
                </div>
                <div class="createdeal-main_form-input">
                    <div class="createdeal-main_form-input-title">Дата:</div>
                    <UiInput class="input" placeholder="Введите дату" type="date" id="date" v-model="form.date" required />
                </div>
                <UiButton :disabled="isPending" class="btn">
                    {{ isPending ? 'Загрузка...' : 'Добавить' }}
                </UiButton>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.createdeal-main {
    &_container {
        padding: 10px 40px;
        width: 1000px;
        display: grid;
        text-align: center;
        margin: 0 auto;
    }
    &_form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        animation-name: appearance;
        animation-duration: 0.5s;
        @keyframes appearance {
            from {
                margin-top: -50px;
                opacity: 0;
            }
            35% {
                opacity: 0;
            }
            to {
                margin-left: 0px;
                opacity: 1;
            }
        }
        &-input {
            margin-left: 24px;
            &-title {
                margin-top: 10px;
                text-align: start;
            }
        }
    }
}
.icon{ 
    color: rgb(73, 73, 73);
    font-size: 40px;
    position: relative;
    transform-style: flat;
    transition: transform 0.2s ease-in-out;
}
.flipped {
    transform: rotate(45deg);
    color: var(--sidebar);
}
.input {
    width: 200px;
}
.select {
    width: 200px;
}
.btn {
    margin-left: 24px;
    width: 200px;
    color: var(--primary);
    background-color: var(--sidebar);
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.10);
    }
}
</style>