<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { DB_ID, COLLECTION_DEALS} from '~/app.constants';
import type { IDeal } from '~/types/deals.types.js';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import CreateDeal from './CreateDeal.vue';
import { useDealSlideStore } from '~/store/deal-slide.store';
import { DB } from '~/utils/appwrite';

const { data, isLoading, refetch } = useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
});

const store = useDealSlideStore()

const deleteDealMutation = useMutation({
    mutationFn: (dealId: string) => {
        return DB.deleteDocument(DB_ID, COLLECTION_DEALS, dealId);
    },
    onSuccess: () => {
        refetch(); 
    },
    onError: (error) => {
        console.error('Ошибка при удалении заказа:', error);
    },
});

const handleDelete = (dealId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
        deleteDealMutation.mutate(dealId);
    }
};

const updateStatusMutation = useMutation({
    mutationFn: ({ dealId, status }: { dealId: string, status: string }) => {
        return DB.updateDocument(DB_ID, COLLECTION_DEALS, dealId, { status });
    },
    onSuccess: () => {
        refetch();
    },
    onError: (error) => {
        console.error('Ошибка при обновлении статуса:', error);
    },
});

const updateStatus = (dealId: string, newStatus: string) => {
    updateStatusMutation.mutate({ dealId, status: newStatus });
};

const getStatusClass = (status?: string) => {
    switch (status) {
        case 'to-be-agreed':
            return 'bg-blue-500 text-white ';
        case 'in-progress':
            return 'bg-yellow-500 text-black'; 
        case 'done':
            return 'bg-green-500 text-white'; 
        default:
            return 'to-be-agreed';
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
    <div class="main-deals" v-auto-animate>
        <div v-if="isLoading" class="loader">Loading...</div>
        <div class="main-deals_container" v-else>
            <div class="main-deals_title">Заказы</div>
            <hr class="my-2.5 border-slate-500">
            <div class="-mx-5">
                <CreateDeal :refetch="refetch"></CreateDeal>
                <div class="scroll">
                    <UiTable>
                        <UiTableHeader>
                            <UiTableRow>
                                <UiTableHead class="pl-10">Наименование</UiTableHead>
                                <UiTableHead>Тип</UiTableHead>
                                <UiTableHead>Автор</UiTableHead>
                                <UiTableHead>Цена</UiTableHead>
                                <UiTableHead>Количество</UiTableHead>
                                <UiTableHead>Клиент</UiTableHead>
                                <UiTableHead>Статус</UiTableHead>
                                <UiTableHead>Дата</UiTableHead>
                                <UiTableHead>Действие</UiTableHead>
                            </UiTableRow>
                        </UiTableHeader>
                        <UiTableBody>
                            <UiTableRow
                                class="hover:bg-blue-600 hover:text-white"
                                v-for="deal in (data?.documents as unknown as IDeal[])"
                                :key="deal.$id"
                            >
                                <!-- <UiTableCell class="pl-10">
                                    <NuxtLink :href="`/customers/edit/${customer.$id}`">
                                      <img :src="customer.avatar_url" alt="customer.name" width="80" class="rounded-full size-20" />
                                    </NuxtLink>
                                </UiTableCell> -->
                                <UiTableCell class="pl-10 cursor-pointer" @click='store.set(deal)'>{{ deal.name }}</UiTableCell>
                                <UiTableCell>{{ deal.types.name }}</UiTableCell>
                                <UiTableCell>{{ deal.authors.name }}</UiTableCell>
                                <UiTableCell>{{ deal.price }}</UiTableCell>
                                <UiTableCell>{{ deal.quantity }}</UiTableCell>
                                <UiTableCell>{{ deal.customers.name }}</UiTableCell>
                                <UiTableCell class="ml-10">
                                    <UiSelect v-auto-animate v-model="deal.status" 
                                        @update:modelValue="(newStatus) => updateStatus(deal.$id, newStatus)"
                                        :class="getStatusClass(deal.status)">
                                        <UiSelectTrigger :class="['select', getStatusClass(deal.status)]">
                                            <UiSelectValue />
                                        </UiSelectTrigger>
                                            <UiSelectContent>
                                                <UiSelectGroup>
                                                    <UiSelectItem value="to-be-agreed">
                                                        В обработке
                                                    </UiSelectItem>
                                                    <UiSelectItem value="in-progress">
                                                        В процессе
                                                    </UiSelectItem>
                                                    <UiSelectItem value="done">
                                                        Выполнен
                                                    </UiSelectItem>
                                                </UiSelectGroup>
                                            </UiSelectContent>
                                    </UiSelect>
                                </UiTableCell>
                                <UiTableCell>{{ deal.date }}</UiTableCell>
                                <UiTableCell>
                                    <UiButton @click="handleDelete(deal.$id)" variant="destructive" class="btn">
                                        Удалить
                                    </UiButton>
                                </UiTableCell>
                            </UiTableRow>
                        </UiTableBody>
                    </UiTable>
                </div>
            </div>
            <Slideover></Slideover>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-deals {
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
.select {
    outline: none; 
    box-shadow: none; 
    border: none;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.10);
    }
    &:focus {
        outline: none;
        box-shadow: none; 
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
.bg-blue-500 {
    background-color: #3b82f6;
}
.bg-yellow-500 {
    background-color: #facc15;
}
.bg-green-500 {
    background-color: #22c55e;
}
.bg-gray-200 {
    background-color: #e5e7eb;
}
.text-white {
    color: #ffffff;
}
.text-black {
    color: #000000;
}
</style>