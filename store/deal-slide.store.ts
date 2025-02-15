import type { IDeal } from "~/types/deals.types";


const defaultValue: { deal:  IDeal | null; isOpen: boolean} = { 
    deal: null,
    isOpen: false,
}

export const useDealSlideStore = defineStore('deal-slide', {
    state: () => defaultValue,
    actions: {
        clear() {
            this.$patch(defaultValue)
        },
        set(deal: IDeal) {
            this.$patch({ deal, isOpen: true })
        },
        toggle() {
            this.isOpen = !this.isOpen
        }
    }
})