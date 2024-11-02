<template>
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'HeaderComponent',
    props: {
        title: {
            type: String,
            required: true,
        },
    },

    setup() {
        const store = useStore();
        const router = useRouter();

        const logout = async () => {
            await store.dispatch('user/logout');
            router.push({ name: 'Login' });
        };

        return {
            logout,
        };
    },
});
</script>