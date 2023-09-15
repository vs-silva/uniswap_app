import {afterAll, beforeAll, describe, expect, test} from "vitest";
import {cleanup, render, RenderResult} from "@testing-library/vue";
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
        expect(() => component.getByTestId('table-component-container')).toBeDefined();
    });

    test('should contain head and body', () => {
        expect(() => component.getByTestId('table-component-head')).toBeDefined();
        expect(() => component.getByTestId('table-component-body')).toBeDefined();
    });

    test('given a cryptoTokens collection it should render the table header and body', async () => {

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection
        });

        const idRegex = /name|symbol|totalSupplyAmount|totalValueLockedInUSD/i;

        expect(() => component.getByTestId('table-component-head-column-row')).toBeDefined();
        const headColumns = component.getAllByTestId('table-component-head-column');
        const bodyRows = component.getAllByTestId('table-component-body-row');

        expect(headColumns).toBeDefined();
        expect(headColumns.length).toEqual(4);

        headColumns.forEach(headColumn => {
            expect(headColumn.id).toBeDefined();
            expect(headColumn.id).toMatch(idRegex);
        });

        expect(bodyRows).toBeDefined();
        expect(bodyRows.length).toEqual(fakeCryptoTokensCollection.length);

        for (let i = 0; i < bodyRows.length; i++) {
            const bodyRow = bodyRows[i];
            const cryptoToken = fakeCryptoTokensCollection[i];
            expect(bodyRow.id).toEqual(cryptoToken.id);

            const bodyRowCells = (bodyRow as HTMLElement).children;

            for (let j = 0; j < bodyRowCells.length; j++) {
                expect(bodyRowCells[j].textContent).toEqual(cryptoToken[j === 0 ? 'name' : j === 1 ? 'symbol' : j === 2 ? 'totalSupplyAmount' : 'totalValueLockedInUSD'].toString());
            }
        }

    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });

});
