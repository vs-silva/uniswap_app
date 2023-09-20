import {ref} from "vue";
import CryptoTokens from "../../integration/cryto_tokens";
import type {CryptoTokenDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import type {CryptoTokensRequestDTO} from "../../integration/cryto_tokens/core/dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokenOptionalRequestDTO} from "./dtos/crypto-token-optional-request.dto.ts";
import type {CryptoTokenDetailDTO} from "../../integration/cryto_tokens/core/dtos/crypto-token-detail.dto.ts";
import {CryptoTokensOrderByConstants} from "../../integration/cryto_tokens/core/constants/crypto-tokens-order-by.constants.ts";
import {CryptoTokensOrderDirectionConstants} from "../../integration/cryto_tokens/core/constants/crypto-tokens-order-direction.constants.ts";


export const CryptoTokensStoreIdentifier = 'crypto-tokens-store';

export function CryptoTokensStore() {

    const defaultRequestAmount = ref<number>(10);

    const cryptoTokenRequestDTO = ref<CryptoTokensRequestDTO>({
        name: '',
        orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
        amount: defaultRequestAmount.value,
        skip: 0
    });

    const cryptoTokens = ref<CryptoTokenDTO[] | null>(null);
    const cryptoTokenDetails = ref<CryptoTokenDetailDTO | null>(null);

    async function getCryptoTokens(): Promise<void> {
        cryptoTokens.value = await CryptoTokens.getCryptoTokens(cryptoTokenRequestDTO.value);
    }

    async function getCryptoTokenDetails(name: string): Promise<void> {

        const cryptoTokenDetailRequest = <CryptoTokensRequestDTO>{
          name: name,
            orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
            orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
            amount: 1,
            skip: 0
        };

        cryptoTokenDetails.value = await CryptoTokens.getCryptoTokenDetails(cryptoTokenDetailRequest);
    }

    async function updateCryptoTokenRequestDTO(dto: CryptoTokenOptionalRequestDTO): Promise<void> {
        cryptoTokenRequestDTO.value = generateNewCryptoTokensRequestDTO(dto);
        await getCryptoTokens();
    }

    function generateNewCryptoTokensRequestDTO(dto: CryptoTokenOptionalRequestDTO): CryptoTokensRequestDTO {
        return <CryptoTokensRequestDTO>{
            ...cryptoTokenRequestDTO.value,
            ...dto,
            amount: defaultRequestAmount.value,
            skip: Math.max(0, (cryptoTokenRequestDTO.value.skip + (dto.amount  ?? 0)))
        };
    }

    return {
        defaultRequestAmount,
        cryptoTokenRequestDTO,
        cryptoTokens,
        cryptoTokenDetails,
        getCryptoTokens,
        getCryptoTokenDetails,
        updateCryptoTokenRequestDTO
    };
}
