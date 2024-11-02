<template>
  <v-app>
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar.visible" :color="snackbar.type" timeout="3000">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="closeSnackbar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const snackbar = computed(() => store.getters['notifications/getSnackbar']);

    const closeSnackbar = () => {
      store.dispatch('notifications/clearNotification');
    }

    return {
      snackbar,
      closeSnackbar
    }
  }

})
</script>
