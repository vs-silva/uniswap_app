import type {CryptoTokenDTO} from "./crypto-token.dto.ts";

export interface CryptoTokenDetailDTO extends CryptoTokenDTO {
    volume: number;
    volumeInUSD: number;
    untrackedVolumeInUSD: number;
    feesInUSD: number;
    poolCount: number;
    derivedETH: number;
}
