<template>
  <v-app>
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar.visible" :color="snackbar.type" timeout="3000">
        {{ snackbar.message }}
        <span class="close-icon" @click="closeSnackbar">
          <v-icon :color="COLORS.GRAY_100">mdi-close</v-icon>
        </span>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import { COLORS } from '@/styles/colors'


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
      COLORS,
      closeSnackbar
    }
  }
})
</script>

<style scoped>
.close-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
}

</style>
