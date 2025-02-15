<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { defineProps } from 'vue';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types';
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { DB, ID } from '~/utils/appwrite';

const isOpenForm = ref<boolean>(false)

interface ICustomerFormState extends Pick<ICustomer, 'name' | 'email'>{}

const props = defineProps({
    refetch: {
        type: Function,
    }
})

const {handleSubmit, defineField, handleReset} = useForm<ICustomerFormState>({

})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')

const {mutate, isPending} = useMutation({
    mutationKey: ['create a new customer'],
    mutationFn: (data: ICustomer) => DB.createDocument(DB_ID, COLLECTION_CUSTOMERS, ID.unique(), data),
    onSuccess(data){
        props.refetch && props.refetch()
        handleReset()
    }
})

const onSubmit = handleSubmit(values => {
    mutate(values as ICustomer)
})

const isFlipped = ref<boolean>(false);

</script>

<template>
    <div class="createcustomer-main" v-auto-animate>
        <div class="createcustomer-main_container">
            <div class="createcustomer-main_icon">
                <button @click="isOpenForm = !isOpenForm">
                    <Icon :class="['icon', {flipped: isFlipped}]" @click="isFlipped = !isFlipped" name="ooui:add"></Icon>
                </button>
            </div>
            <form class="createcustomer-main_form" v-if="isOpenForm" @submit="onSubmit">
                <div class="createcustomer-main_form-inputs-title">Наименование:</div>
                <UiInput placeholder="Введите наименование" v-model="name" v-bind="nameAttrs" type="text">
                </UiInput>
                <div class="createcustomer-main_form-inputs-title">Почта:</div>
                <UiInput placeholder="Введите почту" v-model="email" v-bind="emailAttrs" type="text">
                </UiInput>
                <UiButton :disabled="isPending" class="btn">
                    {{ isPending ? 'Загрузка...' : 'Добавить' }}
                </UiButton>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .createcustomer-main {
        &_container {
            padding: 10px 40px;
            width: 500px;
            display: grid;
            text-align: center;
            margin: 0 auto;
        }
        &_form {
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
            &-inputs-title {
                margin-top: 10px;
                text-align: start;
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
    .btn {
        margin-top: 10px;
        color: var(--primary);
        background-color: var(--sidebar);
        transition: all 0.2s ease-in-out;
        &:hover {
            transform: scale(1.10);
        }
    }
</style>