import {ref} from "vue";
import CryptoTokens from "../../integration/cryto_tokens";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {CryptoTokensRequestDTO} from "../../integration/cryto_tokens/core/dtos/crypto-tokens-request.dto.ts";
import {CryptoTokensOrderByConstants} from "../../integration/cryto_tokens/core/constants/crypto-tokens-order-by.constants.ts";
import {CryptoTokensOrderDirectionConstants} from "../../integration/cryto_tokens/core/constants/crypto-tokens-order-direction.constants.ts";


export const CryptoTokensStoreIdentifier = 'crypto-tokens-store';

export function CryptoTokensStore() {

    const cryptoTokenRequestDTO = ref<CryptoTokensRequestDTO>({
        name: '',
        orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
        amount: 5,
        skip: 0
    });

    const cryptoTokens = ref<CryptoTokenDTO[] | null>(null);

    async function getCryptoTokens(): Promise<void> {
        cryptoTokens.value = await CryptoTokens.getCryptoTokens(cryptoTokenRequestDTO.value);
    }

    return {
        cryptoTokens,
        getCryptoTokens
    };
}
