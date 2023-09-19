<template>
  <div data-testid="detail-component-container">

    <v-dialog
        v-model="display"
        width="auto"
    >
      <v-card>

        <v-card-text data-testid="detail-component-body" v-if="cryptoToken">

          <div class="mb-4">
            <div class="font-weight-normal">
              <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_NAME) }}</strong>
              <p>{{  cryptoToken.name }}</p>
            </div>
          </div>

          <div>
            <v-list lines="one">
              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_SYMBOL) }}</strong>
                <p>{{  cryptoToken.symbol }}</p>
              </v-list-item>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_SUPPLY) }}</strong>
                <p>{{  cryptoToken.totalSupplyAmount }}</p>
              </v-list-item>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_VALUE_IN_USD) }}</strong>
                <p>{{  cryptoToken.totalValueLockedInUSD }}</p>
              </v-list-item>
            </v-list>
          </div>

        </v-card-text>

        <v-card-actions>
          <v-btn data-testid="detail-component-close-button"
                 variant="plain"
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
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import EventBusEngine from "../../engines/event-bus-engine";
import {CryptoTokenStoreEventTypeConstants} from "../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";
import {DetailComponentConstants} from "./constants/detail-component.constants.ts";
import {translate} from "../../language_resources";

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
