import {afterAll, beforeAll, describe, expect, test} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import TableComponent from "../index.vue";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";

describe("Components: Table component tests", () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(TableComponent);
    });

    const fakeCryptoTokensCollection: CryptoTokenDTO[] = [
        <CryptoTokenDTO>{
            id: faker.database.mongodbObjectId(),
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 300}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 3000, precision: 2})
        },
        <CryptoTokenDTO>{
            id: faker.database.mongodbObjectId(),
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 300}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 3000, precision: 2})
        }
    ];

    test('should contain component container', () => {
        const componentContainer = component.getByTestId('table-component-container');
        expect(componentContainer).toBeDefined();
    });

    test('should contain head and body', () => {
        const headContainer = component.getByTestId('table-component-head');
        const bodyContainer = component.getByTestId('table-component-body');
        expect(headContainer).toBeDefined();
        expect(bodyContainer).toBeDefined();
    });

    test('given a cryptoTokens collection it should render the table header and body', async () => {

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection
        });

        const idRegex = /name|symbol|totalSupplyAmount|totalValueLockedInUSD/i;

        const headColumnRow = component.getByTestId('table-component-head-column-row');
        const headColumns = component.getAllByTestId('table-component-head-column');

        expect(headColumnRow).toBeDefined();
        expect(headColumns).toBeDefined();
        expect(headColumns.length).toEqual(4);

        headColumns.forEach(headColumn => {
            expect(headColumn.id).toBeDefined();
            expect(headColumn.id).toMatch(idRegex);
        })



        component.debug();

    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });

});
