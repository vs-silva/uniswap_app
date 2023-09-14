<template>
  <div data-testid="pagination-component-container">

    <div v-if="totalItems">
      <v-btn variant="plain" data-testid="pagination-component-previous-button" @click.prevent="() => {
        const temporaryAmount = totalItems - props.defaultPaginationAmount;
        paginationHandler(<CryptoTokenOptionalRequestDTO>{
          amount: (temporaryAmount < 0) ? 0 : temporaryAmount,
          skip: (temporaryAmount < 0) ? 0 : temporaryAmount
        });
      }">
        {{translate(PaginationComponentConstants.LANGUAGE_RESOURCE_KEY_PREVIOUS)}}
      </v-btn>

      <v-btn variant="plain" data-testid="pagination-component-next-button" @click.prevent="() => {
        paginationHandler(<CryptoTokenOptionalRequestDTO>{
          amount: props.defaultPaginationAmount,
          skip: props.defaultPaginationAmount
        });
      }">
        {{translate(PaginationComponentConstants.LANGUAGE_RESOURCE_KEY_NEXT)}}
      </v-btn>
    </div>

  </div>
</template>

<script setup lang="ts">

import {PropType, watch, ref} from "@vue/runtime-core";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {PaginationComponentConstants} from "./constants/pagination-component.constants.ts";
import {translate} from "../../language_resources";
import type {CryptoTokenOptionalRequestDTO} from "../../store/crypto-tokens-store/dtos/crypto-token-optional-request.dto.ts";

const totalItems = ref<number>(0);

const props = defineProps({
  cryptoTokens: {
    type: Array as PropType<CryptoTokenDTO[] | null>,
    required: false,
    default: null
  },
  defaultPaginationAmount: {
    type: Number,
    required: false,
    default: 5
  },
  paginationHandler: {
    type: Function as PropType<(dto: CryptoTokenOptionalRequestDTO) => {} | null>,
    required: false,
    default: null
  }
});

watch(
    () => props.cryptoTokens,
    () => {
      if(props.cryptoTokens && props.cryptoTokens.length){
        totalItems.value = props.cryptoTokens.length;
      }
    }
);

</script>

<style scoped lang="scss">

</style>
