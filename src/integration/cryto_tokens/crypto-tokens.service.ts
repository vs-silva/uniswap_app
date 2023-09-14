import type {CryptoTokensServiceDriverPorts} from "./ports/crypto-tokens-service-driver.ports.ts";
import type {CryptoTokensRequestDTO} from "./core/dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokenDTO} from "./core/dtos/crypto-token.dto.ts";
import type {CryptoTokensServiceReaderDrivenPorts} from "./ports/crypto-tokens-service-reader-driven.ports.ts";
import {cryptoTokensGenerateRequestQueryUtil} from "./core/utils/crypto-tokens-generate-request-query.util.ts";

export function CryptoTokensService(reader: CryptoTokensServiceReaderDrivenPorts): CryptoTokensServiceDriverPorts {

    async function getCryptoTokens(dto: CryptoTokensRequestDTO): Promise<CryptoTokenDTO[] | null> {
        try {
            const requestQueryDTO = cryptoTokensGenerateRequestQueryUtil(dto);
            const result = await reader.get(requestQueryDTO);

            if(!result) {
                return null;
            }

            return result.map( cryptoToken => (<CryptoTokenDTO>{
                id: cryptoToken.id,
                name: cryptoToken.name,
                symbol: cryptoToken.symbol,
                totalSupplyAmount: parseFloat(cryptoToken.totalSupply),
                totalValueLockedInUSD: parseFloat(cryptoToken.totalValueLockedUSD)
            }));
        }
        catch (error) {
            return null;
        }
    }

    return {
        getCryptoTokens
    };
}
