<template>
  <v-container>
    <HeaderComponent title="Listagem de Eventos" />

    <v-row class="mb-2 mt-4 d-flex align-center">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="createEvent">Criar Evento</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Eventos</v-card-title>
          <v-data-table :headers="headers" :items="events" :loading="isLoading" class="elevation-1"
            no-data-text="Nenhum evento encontrado" loading-text="Carregando eventos...">
            <template v-slot:[`item.action`]="{ item }">
              <v-btn icon size="x-small" color="primary" @click="viewEvent(item.id)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import HeaderComponent from '@/components/Header.vue';
import { Event } from '@/types/event';

export default defineComponent({
  name: 'EventsListView',

  components: {
    HeaderComponent,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(true);
    const events = computed<Event[]>(() => store.getters['events/getEvents']);

    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch('events/fetchEvents');
      isLoading.value = false;
    });

    const headers = [
      { title: 'Nome', value: 'name' },
      { title: 'Descrição', value: 'description' },
      { title: 'Data', value: 'date' },
      { title: 'Ações', value: 'action', sortable: false },
    ];

    const viewEvent = (id: number) => {
      router.push({ name: 'EventDetails', params: { id: String(id) } });
    };

    const createEvent = () => {
      router.push({ name: 'CreateEvent' });
    };

    return { events, headers, createEvent, viewEvent, isLoading };
  },
});
</script>
