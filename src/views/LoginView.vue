<template>
    <v-container class="d-flex align-center justify-center fill-height pa-6">
        <v-card class="pa-5" color="surface" width="100%" max-width="400">
            <v-card-title class="justify-center">Login</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
                    <v-text-field v-model="password" label="Senha" type="password" required></v-text-field>

                    <v-btn :loading="isLoading" :disabled="isLoading" type="submit" color="primary" class="mt-3" block>
                        <template v-if="isLoading">
                            <v-progress-circular indeterminate size="20" color="white" class="mr2"></v-progress-circular>
                        </template>
                        Login
                    </v-btn>

                    <v-btn color="secondary" class="mt-2" block @click="goToRegister">Registrar-se</v-btn>
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
    name: 'LoginView',
    setup() {
        const store = useStore();
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const isLoading = ref(false);

        const login = async () => {
            isLoading.value = true;
            try {
                await store.dispatch('user/login', { email: email.value, password: password.value });
                router.push({ name: 'Events' });
            } catch (error) {
                console.error(error);
            }
            isLoading.value = false;
        };

        const goToRegister = () => {
            router.push({ name: 'Register' });
        };

        return {
            email,
            password,
            login,
            goToRegister,
            isLoading,
        };
    },
});
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
