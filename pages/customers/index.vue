<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { COLLECTION_CUSTOMERS, DB_ID } from '~/app.constants';
import type { ICustomer } from '~/types/deals.types.js';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import CreateCustomer from './CreateCustomer.vue';
import { DB } from '~/utils/appwrite';

useHead({
    title: 'Customers',
});

const { data, isLoading, refetch } = useQuery({
    queryKey: ['customers'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});

const deleteCustomerMutation = useMutation({
    mutationFn: (customerId: string) => {
        return DB.deleteDocument(DB_ID, COLLECTION_CUSTOMERS, customerId);
    },
    onSuccess: () => {
        refetch(); 
    },
    onError: (error) => {
        console.error('Ошибка при удалении клиента:', error);
    },
});

const handleDelete = (customerId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
        deleteCustomerMutation.mutate(customerId);
    }
};

onMounted(() => {
    refetch();
});

onBeforeRouteUpdate(() => {
    refetch();
});
</script>

<template>
    <div class="main-customers" v-auto-animate>
        <div v-if="isLoading" class="loader">Loading...</div>
        <div class="main-customers_container" v-else>
            <div class="main-customers_title">Клиенты</div>
            <hr class="my-2.5 border-slate-500">
            <div class="-mx-5">
                <CreateCustomer :refetch="refetch"></CreateCustomer>
                <div class="scroll">
                    <UiTable>
                        <UiTableHeader>
                            <UiTableRow>
                                <UiTableHead class="pl-10">Изображение</UiTableHead>
                                <UiTableHead>Наименование</UiTableHead>
                                <UiTableHead>Email</UiTableHead>
                                <UiTableHead>Действие</UiTableHead>
                            </UiTableRow>
                        </UiTableHeader>
                        <UiTableBody>
                            <UiTableRow
                                class="hover:bg-blue-600 hover:text-white"
                                v-for="customer in (data?.documents as unknown as ICustomer[])"
                                :key="customer.$id"
                            >
                                <UiTableCell class="pl-10">
                                    <NuxtLink :href="`/customers/edit/${customer.$id}`">
                                      <img :src="customer.avatar_url" alt="customer.name" width="80" class="rounded-full size-20" />
                                    </NuxtLink>
                                </UiTableCell>
                                <UiTableCell>{{ customer.name }}</UiTableCell>
                                <UiTableCell>{{ customer.email }}</UiTableCell>
                                <UiTableCell>
                                    <UiButton @click="handleDelete(customer.$id)" variant="destructive" class="btn">
                                        Удалить
                                    </UiButton>
                                </UiTableCell>
                            </UiTableRow>
                        </UiTableBody>
                    </UiTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-customers {
    margin-top: 65px;
    &_container {
        padding: 20px;
    }
    &_title {
        font-size: 50px;
        margin: 0px 15px;
    }
}
.loader {
        font-size: 50px;
        margin-top: -100px;
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
}
.btn {
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.10);
    }
}
.scroll {
    max-height: 710px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 15px;
    }
    &::-webkit-scrollbar-track {
        background-color: var(--primary);
    }
    &::-webkit-scrollbar-thumb {
        background-color: var(--sidebar);
    }
}
</style>
