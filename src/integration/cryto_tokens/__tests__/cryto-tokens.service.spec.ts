import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";

describe('Crypto-Tokens service tests', () => {

    const idRegex: RegExp = /^0x[a-f0-9]{40}$/;

    const cryptTokenRequestDTO = <CryptTokenRequestDTO>{
        name: '',
        orderBy: OrderByConstants.TOTAL_VALUE_LOCKED_USD,
        orderDirection: OrderDirectionConstants.DESCENDING,
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
            const result = await CryptoTokens.getCryptoTokens(requestPayload);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(cryptTokenRequestDTO);

            expect(result).toBeTruthy();

            for (let i = 0; i < result.length; i++) {
                const cryptoTokenId = (result[i] as CryptoTokenDTO).id ;
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
        timeout: 30000,
        retry: 3
    });


});
