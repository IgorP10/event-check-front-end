<template>
    <v-container class="d-flex align-center justify-center fill-height pa-6">
        <v-card class="pa-5" color="surface" width="100%" max-width="400">
            <v-card-title class="justify-center">Cadastro</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="register">
                    <v-text-field v-model="name" label="Nome" :error-messages="errors.name" required></v-text-field>
                    <v-text-field v-model="email" label="Email" type="email" :error-messages="errors.email"
                        required></v-text-field>
                    <v-text-field v-model="password" label="Senha" type="password" :error-messages="errors.password"
                        required></v-text-field>
                    <v-text-field v-model="passwordConfirmation" label="Confirme a Senha"
                        :error-messages="errors.password_confirmation" type="password" required></v-text-field>
                    <v-btn :loading="isLoading" :disabled="isLoading" type="submit" color="primary" class="mt-3" block>
                        <template v-if="isLoading">
                            <v-progress-circular indeterminate size="20" color="white"
                                class="mr2"></v-progress-circular>
                        </template>
                        Cadastrar
                    </v-btn>
                    <v-btn color="secondary" class="mt-2" block @click="goToLogin">Voltar para Login</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RegisterView',
    setup() {
        const store = useStore();
        const router = useRouter();
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const passwordConfirmation = ref('');
        const isLoading = ref(false);
        const errors = ref<{ [key: string]: string[] }>({});

        const register = async () => {
            isLoading.value = true;
            errors.value = {};

            try {
                await store.dispatch('user/register', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: passwordConfirmation.value,
                });

                router.push({ name: 'Login' });

            } catch (err) {
                if (err && typeof err === 'object' && 'name' in err) {
                    errors.value = err as { [key: string]: string[] };
                } else {
                    console.error("Unexpected error format:", err);
                }
            } finally {
                isLoading.value = false;
            }
        };

        const goToLogin = () => {
            router.push({ name: 'Login' });
        };

        return {
            name,
            email,
            password,
            passwordConfirmation,
            register,
            goToLogin,
            isLoading,
            errors,
        };
    },
});
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
