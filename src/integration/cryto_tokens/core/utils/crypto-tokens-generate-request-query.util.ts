import type {CryptoTokensRequestDTO} from "../dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokensRequestQueryDTO} from "../dtos/crypto-tokens-request-query.dto.ts";

export function cryptoTokensGenerateRequestQueryUtil(dto: CryptoTokensRequestDTO) : CryptoTokensRequestQueryDTO {
    return {
        operationName: 'tokens',
        query: `query { 
            tokens(where: {name_contains: "${dto.name}"}, orderBy: ${dto.orderBy}, orderDirection: ${dto.orderDirection}, first: ${dto.amount}, skip: ${dto.skip}) {
                id,
                name,
                symbol,
                totalSupply,
                totalValueLockedUSD
                }}`,
        variables: {}
    };
}
