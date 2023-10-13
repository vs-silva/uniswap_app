import {Ref} from "vue";
import {GraphEngine} from "../../../engines/graph-engine";
import {GraphEngineTypeConstants} from "../../../engines/graph-engine/graph-engine-type.constants.ts";
import type {GraphEngineDataDTO} from "../../../engines/graph-engine/graph-engine-data.dto.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {GraphEngineDatasetDTO} from "../../../engines/graph-engine/graph-engine-dataset.dto.ts";

const engine = GraphEngine();

export function generateGraph(canvas:  HTMLCanvasElement | null) {

    if(!canvas){
        return;
    }

    engine.generateGraph(canvas, GraphEngineTypeConstants.BAR, <GraphEngineDataDTO>{
        labels: [],
        datasets: []
    });
}

/*
export function generateGraph(canvas:  Ref<HTMLCanvasElement | null>) {

    if(!canvas.value){
        return;
    }

    console.log(engine)

    engine.generateGraph(canvas.value, GraphEngineTypeConstants.BAR, <GraphEngineDataDTO>{
        labels: [],
        datasets: []
    });
}

export function updateGraph(cryptoTokens: CryptoTokenDTO[] | null): void{
    if(!cryptoTokens || !Array.isArray(cryptoTokens) || !cryptoTokens.length) {
        return;
    }

    //TODO - Process Data to be displayed in graph
    console.log('ready to update:', cryptoTokens);

    engine.updateGraph(<GraphEngineDataDTO>{
       labels: ['sample'],
       datasets: [<GraphEngineDatasetDTO>{
           label: 'This is just a sample',
           data: [1,100, 200, 2],
           borderWidth: 1,
           backgroundColor: "#FFFFFF"
       }]
    });
} */
