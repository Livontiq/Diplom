<script setup lang="ts">
import { useDealSlideStore } from '~/store/deal-slide.store';
import type { IDeal } from '~/types/deals.types';
import { useCreateComment } from './useCreateComment';
import { useComments } from './useComments';

const store = useDealSlideStore()

const {data, refetch, isLoading} = useComments()
const {commentRef, writeComment} = useCreateComment({refetch})

const card = data as unknown as IDeal

</script>

<template>
    <div>
        <UiInput class="mb-2" placeholder="Оставьте комментарий" v-model="commentRef" @keyup.enter="writeComment">

        </UiInput>
        <UiSkeleton v-if="isLoading"></UiSkeleton>
        <div v-else-if="card" class="comments">
            <div class="comment" v-for="comments in card.comments" :key="comments.$id">
                <Icon class="mr-2" name="mdi:message-outline" size="20"></Icon>
                <div>
                    <div class="font-bold">
                        Комменатрий
                    </div>
                    <p>{{ comments.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.comments {
    max-height: 530px;
    overflow-y: auto;
    margin-right: -20px;
    &::-webkit-scrollbar {
        width: 15px;
    }
    &::-webkit-scrollbar-track {
        background-color: #e3e7e8;
    }
    &::-webkit-scrollbar-thumb {
        background-color: var(--sidebar);
    }
}
.comment {
    margin: 10px 5px 0px 0px;
    padding: 10px;
    display: flex;
    border: 1px solid #e3e7e8;
    border-radius: 5px;
    &:first-child {
        margin-top: 0px;
    }
    &:last-child {
        margin-bottom: 0px;
    }
}

</style>