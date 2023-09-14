import {describe, test, expect, vi, afterAll} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {storeToRefs} from "pinia";
import Store from "../../index";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";

describe('Store: Crypto tokens store tests', () => {

    setActivePinia(createPinia());
    const cryptoTokensStore = Store.useCryptoTokensStore();
    const { defaultRequestAmount, cryptoTokens } = storeToRefs(cryptoTokensStore);
    const { getCryptoTokens } = cryptoTokensStore;

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

    afterAll(() => {
        cryptoTokens.value = null;
    });

});
