<script setup lang="ts">
import { defineProps } from 'vue'
import { DB, ID, storage } from '@/utils/appwrite.js';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types.js';

useHead({
    title: 'Customer Edit',
})

interface InputFileEvent extends Event {
    target: HTMLInputElement
}

interface ICustomerFormState
    extends Pick<ICustomer, 'avatar_url' | 'email' | 'name'> {}

const route = useRoute()
const router = useRouter()
const customerId = route.params.id as string

const { handleSubmit, handleReset, defineField, setFieldValue, setValues, values } =
    useForm<ICustomerFormState>()

const { data, isSuccess, refetch } = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFormState
    setValues({
        email: initialData.email,
        avatar_url: initialData.avatar_url,
        name: initialData.name,
    })
})

const [name, nameAttrs] = defineField(ref('name'))
const [email, emailAttrs] = defineField(ref('email'))

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, ID.unique(), file),
    onSuccess(data){
        const response = storage.getFileDownload(STORAGE_ID, data.$id)
        setFieldValue('avatar_url', response.href)
    }
})

const { mutate, isPending } = useMutation({
    mutationKey: ['update customer', customerId],
    mutationFn: (data: ICustomerFormState) =>
        DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
})

const props = defineProps({
    status: {
        type: String,
        default: '',
    },
    refetch: {
        type: Function,
    }
})

const onSumbit = handleSubmit(values => {
    mutate(values)
    router.push('/customers')
})

const onCancel = handleSubmit(values => {
   router.push('/customers')

})

// const onCancel2 = async () => {
//     router.push('/customers')
// }

// props.refetch && props.refetch()
// handleReset()

// // баг не обновляется форма

</script>

<template>
    <div class="main-customer">
        <div class="main-customer_container">
            <div class="main-customer_title">
            Редактирование: {{ (data as unknown as ICustomerFormState)?.name }}
            </div>
            <hr class="my-2.5 border-slate-500">
            <form action="" class="main-customer_form">
                <div class="main-customer_form-inputs">
                    <div class="main-customer_form-inputs-title">Наименование:</div>
                    <UiInput class="input" placeholder="Наименование" v-model="name" v-bind="nameAttrs" type="name"></UiInput>
                    <div class="main-customer_form-inputs-title">Email:</div>
                    <UiInput class="input" placeholder="Email" v-model="email" v-bind="emailAttrs" type="email"></UiInput>
                </div>
                <div class="main-customer_form-img">
                    <div>Лого:</div>
                    <div class="main-customer_form-img-input">
                        <img class="rounded-full size-60" v-if="values.avatar_url || isUploadImagePending" :src="values.avatar_url" alt="img" width="240">
                        <div input>
                            <label>
                                <div>
                                    <UiInput class="input-img" type="file" 
                                    :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
                                    :disabled="isUploadImagePending"
                                    ></UiInput>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="main-customer_form-btns">
                    <UiButton class="btn" :disabled="isPending" @click="onSumbit">
                        {{ isPending ? 'Загрузка...' : 'Сохранить' }}
                    </UiButton>
                    <UiButton class="btn" @click="onCancel">
                        {{ isPending ? 'Загрузка...' : 'Отменить' }}
                    </UiButton>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-customer {
    margin-top: 45px;
    &_container {
        padding: 20px;
    }
    &_title {
        font-size: 50px;
        margin: 0px 15px;
    }
    &_form {
        width: 50%;
        max-width: 500px;
        border-radius: 10px;
        background-color: var(--primary);
        padding: 20px;
        margin: 20px 0px 0px 15px;
        &-inputs {
            .input {
                transition: all 0.2s;
            }
            &-title {
                margin: 10px 0px 0px 0px;
                &:first-child {
                    margin-top: 0px;
                }
            }
        }
        &-img {
            margin-top: 20px;
            background-color: var(--sidebar-text);
            border-radius: 10px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            &-input {
                display: grid;
                justify-items: center;
                .input-img {
                    margin-top: 10px;
                    width: 200px;
                }
            }
        }
        &-btns {
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            .btn {
                background-color: var(--sidebar);
                transition: all 0.2s;
                color: var(--primary);
                &:hover {
                    transform: scale(1.10);
                }
            }
        }
    }
}
</style>