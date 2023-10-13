import {Ref} from "vue";
import {GraphEngine} from "../../../engines/graph-engine";
import {GraphEngineTypeConstants} from "../../../engines/graph-engine/graph-engine-type.constants.ts";
import type {GraphEngineDataDTO} from "../../../engines/graph-engine/graph-engine-data.dto.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";

const engine = GraphEngine();

export function generateGraph(canvas:  Ref<HTMLCanvasElement | null>) {

    if(!canvas.value){
        return;
    }

    engine.generateGraph(canvas.value, GraphEngineTypeConstants.BAR, <GraphEngineDataDTO>{
        labels:[],
        datasets:[]
    });
}

export function updateGraph(cryptoTokens: CryptoTokenDTO[] | null): void{
    if(!cryptoTokens || !Array.isArray(cryptoTokens) || !cryptoTokens.length) {
        return;
    }

    //TODO - Process Data to be displayed in graph
    console.log('ready to update:', cryptoTokens);
}
