import type {CryptoTokensServiceDriverPorts} from "./ports/crypto-tokens-service-driver.ports.ts";
import type {CryptoTokensRequestDTO} from "./core/dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokenDTO} from "./core/dtos/crypto-token.dto.ts";
import type {CryptoTokensServiceReaderDrivenPorts} from "./ports/crypto-tokens-service-reader-driven.ports.ts";
import type {CryptoTokenDetailDTO} from "./core/dtos/crypto-token-detail.dto.ts";
import { cryptoTokenDetailGenerateRequestQueryUtil, cryptoTokensGenerateRequestQueryUtil} from "./core/utils/crypto-tokens-generate-request-query.util.ts";

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

    async function getCryptoTokenDetails(dto: CryptoTokensRequestDTO): Promise<CryptoTokenDetailDTO | null> {
        try {
            const requestQueryDTO = cryptoTokenDetailGenerateRequestQueryUtil(dto);
            const result = await reader.getByName(requestQueryDTO);

            if(!result) {
                return null;
            }

            return <CryptoTokenDetailDTO>{
                id: result.id,
                name: result.name,
                symbol: result.symbol,
                totalSupplyAmount: parseFloat(result.totalSupply),
                totalValueLockedInUSD: parseFloat(result.totalValueLockedUSD),
                volume: parseFloat(result.volume),
                volumeInUSD: parseFloat(result.volumeUSD),
                untrackedVolumeInUSD: parseFloat(result.untrackedVolumeUSD),
                feesInUSD: parseFloat(result.feesUSD),
                poolCount: parseFloat(result.poolCount),
                derivedETH: parseFloat(result.derivedETH)
            };
        }
        catch (error) {
            return null;
        }
    }

    return {
        getCryptoTokens,
        getCryptoTokenDetails
    };
}
