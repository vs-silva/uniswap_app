import {describe, expect, test, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {CryptoTokensOrderDirectionConstants} from "../core/constants/crypto-tokens-order-direction.constants.ts";
import {CryptoTokensOrderByConstants} from "../core/constants/crypto-tokens-order-by.constants.ts";
import type {CryptoTokenDTO} from "../core/dtos/crypto-token.dto.ts";
import type {CryptoTokensRequestDTO} from "../core/dtos/crypto-tokens-request.dto.ts";
import CryptoTokens from "../index.ts";
import {CryptoTokenDetailDTO} from "../core/dtos/crypto-token-detail.dto.ts";

describe('Integration: Crypto-Tokens service tests', () => {

    const idRegex: RegExp = /^0x[a-f0-9]{40}$/;

    const cryptoTokenRequestDTO = <CryptoTokensRequestDTO>{
        name: '',
        orderBy: CryptoTokensOrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: CryptoTokensOrderDirectionConstants.DESCENDING,
        amount: 0,
        skip: 0
    };

    describe('getCryptoTokens port tests', () => {

        test('getCryptoTokens should return a collection of CryptoTokens with the requested amount', async () => {

            expect(CryptoTokens.getCryptoTokens).toBeDefined();
            expect(CryptoTokens.getCryptoTokens).toBeInstanceOf(Function);

            cryptoTokenRequestDTO.amount = faker.number.int({min: 2, max: 10});
            cryptoTokenRequestDTO.skip = faker.number.int({min: 0, max: cryptoTokenRequestDTO.amount});

            const spy = vi.spyOn(CryptoTokens, 'getCryptoTokens');
            const result = await CryptoTokens.getCryptoTokens(cryptoTokenRequestDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(cryptoTokenRequestDTO);

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

    describe('getCryptoTokenDetails port tests', () => {

        test('getCryptoTokenDetails should return a CryptoToken', async () => {

            expect(CryptoTokens.getCryptoTokenDetails).toBeDefined();
            expect(CryptoTokens.getCryptoTokenDetails).toBeInstanceOf(Function);

            cryptoTokenRequestDTO.name = 'UMIIE COIN';
            cryptoTokenRequestDTO.amount = 1;
            cryptoTokenRequestDTO.skip = 0;


            const spy = vi.spyOn(CryptoTokens, 'getCryptoTokenDetails');
            const result = await CryptoTokens.getCryptoTokenDetails(cryptoTokenRequestDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(cryptoTokenRequestDTO);

            expect(result).toBeTruthy();
            expect(result?.id).toBeTruthy();
            expect(result?.id).toMatch(idRegex);

            expect(result).toStrictEqual(expect.objectContaining(<CryptoTokenDetailDTO>{
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

    },{
        timeout: 30000
    });


});
