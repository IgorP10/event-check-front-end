<template>
    <v-card v-if="event" class="mb-4 elevation-2" outlined>
        <v-card-title class="headline">{{ event.name }}</v-card-title>
        <v-card-subtitle>{{ formattedDate }}</v-card-subtitle>
        <v-card-text>
            <v-row>
                <!-- Descrição -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="4" class="text-subtitle-2">Descrição:</v-col>
                        <v-col cols="8" class="text-body-2">{{ event.description || 'Não disponível' }}</v-col>
                    </v-row>
                </v-col>

                <!-- Local -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="4" class="text-subtitle-2">Local:</v-col>
                        <v-col cols="8" class="text-body-2">{{ event.location || 'Não especificado' }}</v-col>
                    </v-row>
                </v-col>

                <!-- Presenças -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="4" class="text-subtitle-2">Presenças:</v-col>
                        <v-col cols="8" class="text-body-2">{{ event.attendances }}</v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <v-card v-else>
        <v-card-title>Evento não encontrado</v-card-title>
        <v-card-text>Evento com ID {{ eventId }} não encontrado.</v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Event } from '@/types/event';

export default defineComponent({
    name: 'EventDetails',
    props: {
        event: {
            type: Object as PropType<Event>,
            required: true,
        },
        eventId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const formattedDate = computed(() => {
            const { event } = props;
            if (!event) return '';
            return `${event.date} - ${event.time}`;
        });

        return {
            formattedDate,
        };
    },
});
</script>