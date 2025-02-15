import { useMutation } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_COMMENTS } from "~/app.constants";
import { useDealSlideStore } from "~/store/deal-slide.store";
import { DB, ID } from "~/utils/appwrite";

export function useCreateComment({ refetch }: { refetch: () => void }) {
    const store = useDealSlideStore()
    const commentRef = ref<string>()

    const { mutate } = useMutation({
        mutationKey: ['add comments', commentRef.value],
        mutationFn: () =>
            DB.createDocument(DB_ID, COLLECTION_COMMENTS, ID.unique(), {
                text: commentRef.value,
                deal: store.deal?.$id,
            }),
        onSuccess: () => {
            refetch()
            commentRef.value = ''
        },
    })

    const writeComment = () => {
        if (!commentRef.value) return
        mutate()
    }

    return {
        writeComment,
        commentRef,
    }
}