import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {CryptoTokensOrderDirectionConstants} from "../core/constants/crypto-tokens-order-direction.constants.ts";
import {CryptoTokensOrderByConstants} from "../core/constants/crypto-tokens-order-by.constants.ts";
import type {CryptoTokenDTO} from "../core/dtos/crypto-token.dto.ts";
import type {CryptoTokensRequestDTO} from "../core/dtos/crypto-tokens-request.dto.ts";
import CryptoTokens from "../index.ts";

describe('Crypto-Tokens service tests', () => {

    const idRegex: RegExp = /^0x[a-f0-9]{40}$/;

    const cryptTokenRequestDTO = <CryptoTokensRequestDTO>{
        name: '',
        orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
        amount: 0,
        skip: 0
    };

    describe('getCryptoTokens port tests', () => {

        it('getCryptoTokens should return a collection of CryptoTokens with the requested amount', async () => {

            expect(CryptoTokens.getCryptoTokens).toBeDefined();
            expect(CryptoTokens.getCryptoTokens).toBeInstanceOf(Function);

            cryptTokenRequestDTO.amount = faker.number.int({min: 2, max: 10});
            cryptTokenRequestDTO.skip = faker.number.int({min: 0, max: cryptTokenRequestDTO.amount});

            const spy = vi.spyOn(CryptoTokens, 'getCryptoTokens');
            const result = await CryptoTokens.getCryptoTokens(cryptTokenRequestDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(cryptTokenRequestDTO);

            expect(result).toBeTruthy();

            for (let i = 0; i < (result?.length as number); i++) {
                const cryptoTokenId =  ((result as CryptoTokenDTO[])[i] as CryptoTokenDTO).id;
                expect(cryptoTokenId).toBeTruthy();
                expect(cryptoTokenId).toMatch(idRegex);
            }
            
            expect(result).toStrictEqual(expect.arrayContaining(<CryptoTokenDTO[]>[expect.objectContaining(<CryptoTokenDTO>{
                id: expect.any(String),
                name: expect.any(String),
                symbol: expect.any(String),
                totalSupplyAmount: expect.any(Number),
                totalValueLockedInUSD: expect.any(Number)
            })]));

        });

    },{
        timeout: 30000
    });


});
