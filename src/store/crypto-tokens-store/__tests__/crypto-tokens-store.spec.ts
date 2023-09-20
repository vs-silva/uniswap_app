import {describe, test, expect, vi, afterAll} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {storeToRefs} from "pinia";
import Store from "../../index";
import {CryptoTokensOrderByConstants} from "../../../integration/cryto_tokens/core/constants/crypto-tokens-order-by.constants.ts";
import {CryptoTokensOrderDirectionConstants} from "../../../integration/cryto_tokens/core/constants/crypto-tokens-order-direction.constants.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import type{CryptoTokenOptionalRequestDTO} from "../dtos/crypto-token-optional-request.dto.ts";
import type {CryptoTokensRequestDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-tokens-request.dto.ts";
import type {CryptoTokenDetailDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token-detail.dto.ts";

describe('Store: Crypto tokens store tests', () => {

    setActivePinia(createPinia());
    const cryptoTokensStore = Store.useCryptoTokensStore();
    const { defaultRequestAmount, cryptoTokenRequestDTO, cryptoTokens, cryptoTokenDetails } = storeToRefs(cryptoTokensStore);
    const { getCryptoTokens, updateCryptoTokenRequestDTO, getCryptoTokenDetails } = cryptoTokensStore;

    const initialCryptoTokensRequestDTO = <CryptoTokensRequestDTO>{
        name: '',
        orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
        amount: defaultRequestAmount.value,
        skip: 0
    };

    test('getCryptoTokens should make a default request of 5 crypto tokens and then cryptoTokens collection with the return data', async () => {

        expect(getCryptoTokens).toBeDefined();
        expect(getCryptoTokens).toBeInstanceOf(Function);

        expect(cryptoTokens).toBeDefined();
        expect(cryptoTokens.value).toBeNull();

        expect(defaultRequestAmount).toBeDefined();
        expect(defaultRequestAmount.value).toEqual(10);

        const spy = vi.fn(getCryptoTokens);
        await spy();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith();

        expect(cryptoTokens.value).toBeDefined();
        expect(cryptoTokens.value?.length).toEqual(defaultRequestAmount.value);

        expect(cryptoTokens.value).toStrictEqual(expect.arrayContaining(<CryptoTokenDTO[]>[expect.objectContaining(<CryptoTokenDTO>{
            id: expect.any(String),
            name: expect.any(String),
            symbol: expect.any(String),
            totalSupplyAmount: expect.any(Number),
            totalValueLockedInUSD: expect.any(Number)
        })]));

    });


    test('updateCryptoTokenRequestDTO when called with negative amount value it should create a new cryptoTokenRequestDTO with the updated amount and skip values', async () => {

        expect(cryptoTokenRequestDTO).toBeDefined();
        expect(cryptoTokenRequestDTO.value).toEqual(initialCryptoTokensRequestDTO);

        expect(updateCryptoTokenRequestDTO).toBeDefined();
        expect(updateCryptoTokenRequestDTO).toBeInstanceOf(Function);

        const fakeCryptoTokenOptionalRequestDTO = <CryptoTokenOptionalRequestDTO> {
            amount: -10
        };

        const spy = vi.fn(updateCryptoTokenRequestDTO);
        await spy(fakeCryptoTokenOptionalRequestDTO);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(fakeCryptoTokenOptionalRequestDTO);

        expect(cryptoTokenRequestDTO.value.amount).toEqual(defaultRequestAmount.value);
        expect(cryptoTokenRequestDTO.value.skip).toEqual(initialCryptoTokensRequestDTO.skip);

    });

    test('updateCryptoTokenRequestDTO when called with positive amount and skip values it should create a new cryptoTokenRequestDTO with the updated amount and skip values', async () => {

        const fakeCryptoTokenOptionalRequestDTO = <CryptoTokenOptionalRequestDTO> {
            amount: 10
        };

        const spy = vi.fn(updateCryptoTokenRequestDTO);
        await spy(fakeCryptoTokenOptionalRequestDTO);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(fakeCryptoTokenOptionalRequestDTO);

        const tempSkip = initialCryptoTokensRequestDTO.skip + (fakeCryptoTokenOptionalRequestDTO.amount ?? 0) as number;

        expect(cryptoTokenRequestDTO.value.amount).toEqual(defaultRequestAmount.value);
        expect(cryptoTokenRequestDTO.value.skip).toEqual(tempSkip);

    });

    test('getCryptoTokenDetails should return a CryptoTokenDetailDTO and update cryptoTokenDetails', async () => {

        expect(getCryptoTokenDetails).toBeDefined();
        expect(getCryptoTokenDetails).toBeInstanceOf(Function);

        expect(cryptoTokenDetails).toBeDefined();
        expect(cryptoTokenDetails.value).toBeNull();

        const requestedCryptoTokenName = 'UMIIE COIN';

        const spy = vi.fn(getCryptoTokenDetails);
        await spy(requestedCryptoTokenName);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(requestedCryptoTokenName);

        expect(cryptoTokenDetails.value).toBeDefined();
        expect(cryptoTokenDetails.value?.name).toEqual(requestedCryptoTokenName);

        expect(cryptoTokenDetails.value).toStrictEqual(expect.objectContaining(<CryptoTokenDetailDTO>{
            id: expect.any(String),
            name: expect.any(String),
            symbol: expect.any(String),
            totalSupplyAmount: expect.any(Number),
            totalValueLockedInUSD: expect.any(Number),
            poolCount: expect.any(Number),
            derivedETH: expect.any(Number),
            feesInUSD: expect.any(Number),
            untrackedVolumeInUSD: expect.any(Number),
            volume: expect.any(Number),
            volumeInUSD: expect.any(Number)
        }));

    });

    afterAll(() => {
        cryptoTokens.value = null;
    });

});
