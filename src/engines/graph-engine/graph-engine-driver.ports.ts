import type {GraphEngineDataDTO} from "./graph-engine-data.dto.ts";

export interface GraphEngineDriverPorts {
    generateGraph(canvas:HTMLCanvasElement ,graphType:string, graphData: GraphEngineDataDTO): void;
    updateGraph(graphData: GraphEngineDataDTO): void;
}
