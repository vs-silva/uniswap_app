<template>
  <div>
    <p>{{loading}}</p>

    <table-component
        :cryptoTokens="cryptoTokens"
    />

    <pagination-component
        :cryptoTokens="cryptoTokens"
        :defaultPaginationAmount="defaultRequestAmount"
        :paginationHandler="updateCryptoTokenRequestDTO"
    />

    <detail-component
        :cryptoTokenDetails="cryptoTokenDetails"
        :cryptoTokenDetailsRequestActionHandler="getCryptoTokenDetails"
    />

    <graph-component
        :cryptoTokens="cryptoTokens"
    />

  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, onDeactivated} from "@vue/runtime-core";
import Store from "./store";
import {storeToRefs} from "pinia";
import EventBusEngine from "./engines/event-bus-engine";
import {CryptoTokensEventTypeConstants} from "./integration/cryto_tokens/core/constants/crypto-tokens-event-type.constants.ts";
//--//
import TableComponent from "./components/table-component/index.vue";
import PaginationComponent from "./components/pagination-component/index.vue";
import DetailComponent from "./components/detail-component/index.vue";
import GraphComponent from "./components/graph-component/index.vue"

const loading = ref<boolean>(false);

const { useCryptoTokensStore } = Store;
const cryptoTokenStore = useCryptoTokensStore();
const { getCryptoTokens, updateCryptoTokenRequestDTO, getCryptoTokenDetails } = cryptoTokenStore
const { defaultRequestAmount, cryptoTokens, cryptoTokenDetails } = storeToRefs(cryptoTokenStore);

onBeforeMount(async () => {
  EventBusEngine.on(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_STARTED, () => {
    loading.value = true;
  });

  EventBusEngine.on(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_ENDED, () => {
    loading.value = false;
  });

  EventBusEngine.on(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_FAILED, () => {
    loading.value = false;
  });

  await getCryptoTokens();
});

onDeactivated(() => {
  EventBusEngine.off(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_STARTED);
  EventBusEngine.off(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_ENDED);
  EventBusEngine.off(CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_FAILED);
});
</script>

<style scoped lang="scss">
</style>
