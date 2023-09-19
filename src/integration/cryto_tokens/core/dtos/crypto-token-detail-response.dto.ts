import type {CryptoTokensResponseDTO} from "./crypto-tokens-response.dto.ts";

export interface CryptoTokenDetailResponseDTO extends CryptoTokensResponseDTO {
    volume: string;
    volumeUSD: string;
    untrackedVolumeUSD: string;
    feesUSD: string;
    poolCount: string;
    derivedETH: string;
}
