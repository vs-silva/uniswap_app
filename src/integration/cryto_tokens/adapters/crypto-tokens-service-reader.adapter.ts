import type {CryptoTokensServiceReaderDrivenPorts} from "../ports/crypto-tokens-service-reader-driven.ports.ts";
import type {CryptoTokensResponseDTO} from "../core/dtos/crypto-tokens-response.dto.ts";
import type {CryptoTokensRequestQueryDTO} from "../core/dtos/crypto-tokens-request-query.dto.ts";
import {AxiosInstance} from "axios";
import {ApiEngine} from "../../../engines/api-engine";
import type {ApiEngineConfigDTO} from "../../../engines/api-engine/api-engine-config.dto.ts";
import EventBusEngine from "../../../engines/event-bus-engine/index.ts";
import {CryptoTokensEventTypeConstants} from "../core/constants/crypto-tokens-event-type.constants.ts";
import {CryptoTokensResourceConstants} from "../core/constants/crypto-tokens-resource.constants.ts";

export function CryptoTokensServiceReaderAdapter(): CryptoTokensServiceReaderDrivenPorts {

    const engine: AxiosInstance = ApiEngine(<ApiEngineConfigDTO>{
        baseURL: CryptoTokensResourceConstants.PROVIDER_ROOT,
        startedServiceRequestEvent: CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_STARTED,
        endedServiceRequestEvent: CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_ENDED,
        errorServiceRequestEvent: CryptoTokensEventTypeConstants.CRYPTO_TOKEN_SERVICE_REQUEST_FAILED
    }, EventBusEngine);


    async function get(dto: CryptoTokensRequestQueryDTO): Promise<CryptoTokensResponseDTO[] | null> {
        try {
            const response = await engine.post(CryptoTokensResourceConstants.PROVIDER_ENDPOINT,dto);
            return response['data']['data']['tokens'] as CryptoTokensResponseDTO[];
        } catch (error) {
            return null;
        }
    }

    return {
        get
    };
}
