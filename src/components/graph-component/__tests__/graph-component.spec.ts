import {afterAll, beforeAll, vi, describe, expect, test} from "vitest";
import {cleanup, render, fireEvent ,RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import GraphComponent from "../index.vue";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";

describe("Components: Graph component tests", () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(GraphComponent);
    });

    const fakeCryptoTokensCollection: CryptoTokenDTO[] = [
        <CryptoTokenDTO>{
            id: faker.database.mongodbObjectId(),
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 500}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 1000, precision: 2})
        },
        <CryptoTokenDTO>{
            id: faker.database.mongodbObjectId(),
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 500}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 1000, precision: 2})
        }
    ];

    test('should contain component container', () => {
        expect(() => component.getByTestId('graph-component-container')).toBeDefined();
        expect(() => component.getByTestId('graph-component-canvas')).toThrowError();
    });

    test('should contain chart canvas if CryptoTokensCollection is provided', async () => {

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection
        });

        const canvas = component.getByTestId('graph-component-canvas');
        expect(canvas).toBeDefined();

        expect(() => component.getByTestId('graph-component-canvas')).toBeTruthy();

        component.debug();

    });

    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
