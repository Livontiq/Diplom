import { set } from "@vueuse/core"

interface IAuthStore {
    name: string
    email: string
    status: boolean
}

const defaultValue: { user: IAuthStore } = {
    user: {
        name: '',
        email: '',
        status: false,
    },
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.user.status
    },
    actions: {
        clear(){
            this.$patch(defaultValue)
        },
        set(input: IAuthStore){
            this.$patch({user: input})
        },
    },
})