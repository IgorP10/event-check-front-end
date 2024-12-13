<template>
    <v-dialog v-model="localVisible" max-width="500px">
        <v-card>
            <v-card-title class="headline">Compartilhar Evento</v-card-title>
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="12" class="text-center">
                        <div v-if="qrCodeData">
                            <img :src="qrCodeData" alt="QR Code" />
                        </div>
                    </v-col>
                    <v-col cols="12" class="text-center mt-4">
                        <v-btn @click="copyLink" color="primary">Copiar Link</v-btn>
                        <v-snackbar v-model="snackbar" timeout="2000">Link copiado com sucesso!</v-snackbar>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import QRCode from 'qrcode';

export default defineComponent({
    name: 'ShareModal',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        eventId: {
            type: Number,
            required: true,
        },
    },
    setup(props, { emit }) {
        const qrCodeData = ref<string | null>(null);
        const snackbar = ref(false);
        const localVisible = ref(props.visible);

        const generateQRCode = async () => {
            const eventUrl = `${process.env.VUE_APP_BASE_URL}/events/${props.eventId}/attendance`;
            try {
                console.log('Gerando QR Code para URL:', eventUrl);
                qrCodeData.value = await QRCode.toDataURL(eventUrl);
            } catch (error) {
                console.error('Erro ao gerar o QR Code:', error);
            }
        };

        const copyLink = () => {
            const eventUrl = `${process.env.VUE_APP_BASE_URL}/events/${props.eventId}/attendance`;
            navigator.clipboard.writeText(eventUrl);
            snackbar.value = true;
        };

        watch(() => props.visible, (newVal) => {
            localVisible.value = newVal;
            if (newVal && props.eventId) {
                generateQRCode();
            }
        });

        onMounted(() => {
            if (props.visible && props.eventId) {
                generateQRCode();
            }
        });

        watch(localVisible, (newVal) => {
            emit('update:visible', newVal);
        });

        return {
            qrCodeData,
            copyLink,
            snackbar,
            localVisible,
        };
    },
});
</script>
