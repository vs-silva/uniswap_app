import {Ref} from "vue";
import {GraphEngine} from "../../../engines/graph-engine";
import {GraphEngineTypeConstants} from "../../../engines/graph-engine/graph-engine-type.constants.ts";
import type {GraphEngineDataDTO} from "../../../engines/graph-engine/graph-engine-data.dto.ts";

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
