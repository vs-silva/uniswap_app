<template>
  <div data-testid="pagination-component-container">

    <div v-if="props.cryptoTokens && props.cryptoTokens.length">
      <v-btn variant="plain" data-testid="pagination-component-previous-button" @click.prevent="() => {
        paginationHandler(<CryptoTokenOptionalRequestDTO>{
          amount: -props.defaultPaginationAmount
        });
      }">
        {{translate(PaginationComponentConstants.LANGUAGE_RESOURCE_KEY_PREVIOUS)}}
      </v-btn>

      <v-btn variant="plain" data-testid="pagination-component-next-button" @click.prevent="() => {
        paginationHandler(<CryptoTokenOptionalRequestDTO>{
          amount: props.defaultPaginationAmount
        });
      }">
        {{translate(PaginationComponentConstants.LANGUAGE_RESOURCE_KEY_NEXT)}}
      </v-btn>
    </div>

  </div>
</template>

<script setup lang="ts">

import {PropType} from "@vue/runtime-core";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {PaginationComponentConstants} from "./constants/pagination-component.constants.ts";
import {translate} from "../../language_resources";
import type {CryptoTokenOptionalRequestDTO} from "../../store/crypto-tokens-store/dtos/crypto-token-optional-request.dto.ts";

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

</script>

<style scoped lang="scss">

</style>
