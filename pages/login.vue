<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';
import { Loader2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/toast/use-toast'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { ID } from 'appwrite';
import { account } from '~/utils/appwrite';

useHead({
    title: 'Login',
})

const name = ref('')
const email = ref('')
const password = ref('')

const isLoading = ref<boolean>(false)
const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  email: z.string().min(5).email().max(50),
  password: z.string().min(8).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const errorValidate = handleSubmit(() => {
})

const errorMessage = async () => {
    toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            variant: 'destructive',
    });
}

const login = async () => {
    isLoading.value = true
    try {
        await account.createEmailPasswordSession(email.value, password.value)
        const response = await account.get()
        if(response){
            authStore.set({
                name: response.name,
                email: response.email,
                status: response.status,
            })
        }
    
        name.value = ''
        email.value = ''
        password.value = ''
    
        await router.push('/')
    } catch (error: unknown) {
        await errorValidate()
        await errorMessage()
    }
    finally {
        isLoading.value = false
    }
}
const register = async () => {
    try {
        await account.create(ID.unique(), email.value, password.value, name.value)
        await login()
    } catch (error: unknown) {
        await errorValidate()
        await errorMessage()
        // TODO: сделать два вида статуса для тоста
    }
    // TODO: при большом кол-ве запросов сервер выдает 429 и не пускает
}
</script>

<template>
    <div class="login_main">
        <div v-if="isLoading" class="loader">Loading...</div>
        <div class="login_main-container" v-else>
            <div class="login_main-title">
                Login
            </div>
            <form class="login_main-form" @submit="errorValidate">
                <div class="login_main-form-input">
                    <FormItem v-auto-animate>
                        <FormField v-slot="{ componentField }" name="name">
                            <UiInput placeholder="Name" type="name" class="input" v-model="name" v-bind="componentField"></UiInput>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="email">
                            <UiInput placeholder="Email" type="email" class="input" v-model="email" v-bind="componentField"></UiInput>
                            <FormMessage class="error-subtitle"/>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="password">
                            <UiInput placeholder="Password" type="password" class="input" v-model="password" v-bind="componentField"></UiInput>
                            <FormMessage class="error-subtitle" />
                        </FormField>
                    </FormItem>
                </div>
                <div class="login_main-form-btn">
                    <UiButton :disabled="isLoading" type="button" variant="default" @click="login" class="btn">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
                            Login
                    </UiButton>
                    <UiButton :disabled="isLoading" type="button" variant="default" @click="register" class="btn">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
                            Register
                    </UiButton>
                </div>
            </form>
        </div>
        <Toaster />
    </div>
</template>

<style scoped lang="scss">
    .login_main {
        z-index: 0;
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-container {
            width: 25%;
            min-width: 300px;
            border-radius: 10px;
            background-color: var(--primary);
            padding: 20px;
            text-align: center;
        }   
        &-form {
            margin-top: 10px;
            .input {
                margin-bottom: 10px;
                transition: all 0.2s;
            }
            .error-subtitle {
                text-align: start;
                margin-top: -5px;
                padding: 0px 0px 10px 13px;
            }
            &-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.25rem;
            }
            .btn {
                background-color: var(--sidebar);
                transition: all 0.2s;
                &:hover {
                    transform: scale(1.10);
                }
            }
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
</style>