import type {CryptoTokensResponseDTO} from "../core/dtos/crypto-tokens-response.dto.ts";
import type {CryptoTokensRequestQueryDTO} from "../core/dtos/crypto-tokens-request-query.dto.ts";
import type {CryptoTokenDetailResponseDTO} from "../core/dtos/crypto-token-detail-response.dto.ts";

export interface CryptoTokensServiceReaderDrivenPorts {
    get(dto: CryptoTokensRequestQueryDTO): Promise<CryptoTokensResponseDTO[] | null>;
    getByName(dto: CryptoTokensRequestQueryDTO): Promise<CryptoTokenDetailResponseDTO | null>;
}
