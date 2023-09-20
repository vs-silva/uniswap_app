import type {CryptoTokensRequestDTO} from "../core/dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokenDTO} from "../core/dtos/crypto-token.dto.ts";
import type {CryptoTokenDetailDTO} from "../core/dtos/crypto-token-detail.dto.ts";

export interface CryptoTokensServiceDriverPorts {
    getCryptoTokens(dto: CryptoTokensRequestDTO): Promise<CryptoTokenDTO[] | null>;
    getCryptoTokenDetails(dto: CryptoTokensRequestDTO): Promise<CryptoTokenDetailDTO | null>;
}
