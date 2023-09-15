<template>
  <div data-testid="detail-component-container">

    <v-dialog
        v-model="display"
        width="auto"
    >
      <v-card>

        <v-card-text data-testid="detail-component-body" v-if="cryptoToken">
          {{cryptoToken}}
        </v-card-text>

        <v-card-actions>
          <v-btn data-testid="detail-component-close-button"
                 color="primary"
                 block
                 @click="() => {
                    display = false;
                    cryptoToken = null;
          }">{{translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_CLOSE)}}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onDeactivated, ref} from "@vue/runtime-core";
import {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import EventBusEngine from "../../engines/event-bus-engine";
import {
  CryptoTokenStoreEventTypeConstants
} from "../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";
import {translate} from "../../language_resources";
import {DetailComponentConstants} from "./constants/detail-component.constants.ts";

const display = ref<boolean>(false);
const cryptoToken = ref<CryptoTokenDTO | null>(null);

onBeforeMount(() => {
  EventBusEngine.on(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS, (dto: unknown) => {
    cryptoToken.value = dto as CryptoTokenDTO;
    display.value = true;
  });
});

onDeactivated(() => {
  EventBusEngine.off(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS);
});



</script>

<style scoped lang="scss">

</style>
