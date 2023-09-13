import type {CryptoTokensResponseDTO} from "../core/dtos/crypto-tokens-response.dto.ts";
import type {CryptoTokensRequestQueryDTO} from "../core/dtos/crypto-tokens-request-query.dto.ts";

export interface CryptoTokensServiceReaderDrivenPorts {
    get(dto: CryptoTokensRequestQueryDTO): Promise<CryptoTokensResponseDTO[] | null>;
}
