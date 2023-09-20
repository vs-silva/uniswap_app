<template>
  <div data-testid="table-component-container">

    <v-table :hover="true">
      <thead data-testid="table-component-head">
        <tr data-testid="table-component-head-column-row">
          <th data-testid="table-component-head-column"
            v-for="column in tableColumns" :key="column.name"
            :id="column.id"
          >
            <span class="font-weight-bold">{{column.name}}</span>
          </th>
        </tr>
      </thead>
      <tbody data-testid="table-component-body">
        <tr data-testid="table-component-body-row"
            v-for="cryptoToken in props.cryptoTokens"
            :key="cryptoToken.id"
            :id="cryptoToken.id"
            class="text-left u-cursor_pointer"
            @click.prevent="() => {
              EventBusEngine.emit(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS, <CryptoTokenDTO>{
                id: cryptoToken.id,
                symbol: cryptoToken.symbol,
                name: cryptoToken.name,
                totalSupplyAmount: cryptoToken.totalSupplyAmount,
                totalValueLockedInUSD: cryptoToken.totalValueLockedInUSD
              });
            }"
        >
          <td>{{cryptoToken.name}}</td>
          <td>{{cryptoToken.symbol}}</td>
          <td>{{cryptoToken.totalSupplyAmount}}</td>
          <td>{{cryptoToken.totalValueLockedInUSD}}</td>
        </tr>
      </tbody>
    </v-table>

  </div>
</template>

<script setup lang="ts">
import {PropType, watch, ref} from "@vue/runtime-core";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import type {TableColumnDTO} from "./dtos/table-column.dto.ts";
import {generateColumns} from "./utils";
import EventBusEngine from "../../engines/event-bus-engine";
import {
  CryptoTokenStoreEventTypeConstants
} from "../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";

const tableColumns = ref<TableColumnDTO[] | null>([]);

const props = defineProps({
  cryptoTokens: {
    type: Array as PropType<CryptoTokenDTO[] | null>,
    required: false,
    default: null
  }
});

watch(
    () => props.cryptoTokens,
    () => {
      tableColumns.value = generateColumns(props.cryptoTokens);
    }
);

</script>

<style scoped lang="scss">
</style>
