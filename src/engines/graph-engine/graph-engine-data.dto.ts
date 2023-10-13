import type {GraphEngineDatasetDTO} from "./graph-engine-dataset.dto.ts";

export interface GraphEngineDataDTO {
    labels: string[];
    datasets: GraphEngineDatasetDTO[]
}
