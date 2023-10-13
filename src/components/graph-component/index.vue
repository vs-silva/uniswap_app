<template>
  <div data-testid="graph-component-container">

    <canvas id="cryptoTokensGraphCanvas"
            v-if="props.cryptoTokens"
            ref="canvas"
            data-testid="graph-component-canvas"></canvas>
    
  </div>
</template>

<script setup lang="ts">
import {PropType, ref, watch} from "@vue/runtime-core";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {generateGraph} from "./utils";

const canvas = ref<HTMLCanvasElement | null>(null);

const props = defineProps({
  cryptoTokens: {
    type: Array as PropType<CryptoTokenDTO[] | null>,
    required: false,
    default: null
  }
});

generateGraph(canvas);

watch(
    () => props.cryptoTokens,
    (cryptoTokens: CryptoTokenDTO[] | null) => {
      console.log('ready to update:', cryptoTokens);
    }
);

</script>



<style scoped lang="scss">
</style>
