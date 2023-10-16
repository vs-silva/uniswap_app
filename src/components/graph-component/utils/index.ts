import {GraphEngine} from "../../../engines/graph-engine";
import {GraphEngineTypeConstants} from "../../../engines/graph-engine/graph-engine-type.constants.ts";
import {GraphEngineDataDTO} from "../../../engines/graph-engine/graph-engine-data.dto.ts";
import {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {GraphEngineDatasetDTO} from "../../../engines/graph-engine/graph-engine-dataset.dto.ts";
import {translate} from "../../../language_resources";
import {GraphComponentConstants} from "../constants/graph-component.constants.ts";

const engine = GraphEngine();

export function generateGraph(canvas: HTMLCanvasElement | null, cryptoTokens: CryptoTokenDTO[]): void {
    engine.generateGraph(canvas as HTMLCanvasElement, GraphEngineTypeConstants.BAR, <GraphEngineDataDTO>{
        labels: processLabels(cryptoTokens),
        datasets: processDatasets(cryptoTokens)
    });
}

export function updateGraph(cryptoTokens: CryptoTokenDTO[]): void {
    engine.updateGraph(<GraphEngineDataDTO>{
        labels: processLabels(cryptoTokens),
        datasets: processDatasets(cryptoTokens)
    });
}

function processLabels(cryptoTokens: CryptoTokenDTO[]) : string[] {
    return cryptoTokens.map((cryptoToken: CryptoTokenDTO) => (`${cryptoToken.name} - ${cryptoToken.symbol}`));
}

function processDatasets(cryptoTokens: CryptoTokenDTO[]): GraphEngineDatasetDTO[] {

    return [
        <GraphEngineDatasetDTO>{
            label: translate(GraphComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_VALUE_IN_USD),
            data: cryptoTokens.map((cryptoToken: CryptoTokenDTO) =>(cryptoToken.totalValueLockedInUSD)),
            borderWidth: 1
        },
        <GraphEngineDatasetDTO>{
            label: translate(GraphComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_SUPPLY),
            data: cryptoTokens.map((cryptoToken: CryptoTokenDTO) =>(cryptoToken.totalSupplyAmount)),
            borderWidth: 1
        }
    ]
}

