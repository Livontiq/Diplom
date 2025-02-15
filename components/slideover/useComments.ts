import { useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_DEALS } from "~/app.constants";
import { useDealSlideStore } from "~/store/deal-slide.store";
import { DB } from "~/utils/appwrite";

export function useComments() {
    const store = useDealSlideStore()
    const cardId = store.deal?.$id || ''

    return useQuery({
        queryKey: ['deal', cardId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
    })
}