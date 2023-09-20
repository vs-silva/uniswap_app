<template>
  <div data-testid="detail-component-container">

    <v-dialog
        v-model="display"
        width="auto"
    >
      <v-card>

        <v-card-text data-testid="detail-component-body" v-if="props.cryptoTokenDetails">

          <div class="mb-2">
            <div>
              <p class="font-weight-bold">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_NAME) }}</p>
              <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_NAME_DESCRIPTION) }}</p>
              <p class="font-weight-medium">{{  props.cryptoTokenDetails?.name }}</p>
            </div>
          </div>

          <div data-testid="detail-component-body-details">
            <v-list lines="one">
              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_SYMBOL) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_SYMBOL_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.symbol }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_SUPPLY) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_SUPPLY_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.totalSupplyAmount }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_VALUE_IN_USD) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_VALUE_IN_USD_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.totalValueLockedInUSD }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_FEES_IN_USD) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_FEES_IN_USD_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.feesInUSD }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_VOLUME) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_VOLUME_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.volume }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_VOLUME_IN_USD) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_VOLUME_IN_USD_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.volumeInUSD }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_UNTRACKED_VOLUME_IN_USD) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_UNTRACKED_VOLUME_IN_USD_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.untrackedVolumeInUSD }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_POOL_COUNT) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_POOL_COUNT_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.poolCount }}</p>
              </v-list-item>

              <hr/>

              <v-list-item>
                <strong>{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_DERIVED_ETH) }}</strong>
                <p class="text-sm-caption">{{  translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_DERIVED_ETH_DESCRIPTION) }}</p>
                <p class="font-weight-medium">{{  props.cryptoTokenDetails?.derivedETH }}</p>
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
          }">{{translate(DetailComponentConstants.LANGUAGE_RESOURCE_KEY_CLOSE)}}</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onDeactivated, PropType, ref, watch} from "@vue/runtime-core";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import EventBusEngine from "../../engines/event-bus-engine";
import {CryptoTokenStoreEventTypeConstants} from "../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";
import {DetailComponentConstants} from "./constants/detail-component.constants.ts";
import {translate} from "../../language_resources";
import type {CryptoTokenDetailDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token-detail.dto.ts";

const display = ref<boolean>(false);

const props = defineProps({
  cryptoTokenDetails: {
    type: Object as PropType<CryptoTokenDetailDTO | null>,
    required: false,
    default: null
  },
  cryptoTokenDetailsRequestActionHandler: {
    type: Function as PropType<(name: string) => {} | null>,
    required: false,
    default: null,
  }

});

onBeforeMount(() => {
  EventBusEngine.on(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS, (dto: unknown) => {
    if(!props.cryptoTokenDetailsRequestActionHandler) {
      return;
    }

    props.cryptoTokenDetailsRequestActionHandler((dto as CryptoTokenDTO).name);

  });
});

onDeactivated(() => {
  EventBusEngine.off(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS);
});

watch(
    () => props.cryptoTokenDetails,
    () => {
      display.value = true;
    }
);

</script>

<style scoped lang="scss">

</style>
