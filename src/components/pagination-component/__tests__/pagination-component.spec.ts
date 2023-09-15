import {afterAll, beforeAll, vi, describe, expect, test} from "vitest";
import {cleanup, render, fireEvent ,RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import PaginationComponent from "../index.vue";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import type {CryptoTokenOptionalRequestDTO} from "../../../store/crypto-tokens-store/dtos/crypto-token-optional-request.dto.ts";

describe("Components: Pagination component tests", () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(PaginationComponent);
    });

    const fakeCryptoTokensCollection: CryptoTokenDTO[] = [
        <CryptoTokenDTO>{
            id: faker.database.mongodbObjectId(),
            name: faker.finance.currencyName(),
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 300}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 3000, precision: 2})
        }
    ];

    const paginationAmount = 10;

    test('should contain component container', () => {
        expect(() => component.getByTestId('pagination-component-container')).toBeDefined();
    });

    test('should contain previews and next buttons', async () => {

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection,
        });

        expect(() => component.getByTestId('pagination-component-previous-button')).toBeDefined();
        expect(() => component.getByTestId('pagination-component-next-button')).toBeDefined();
    });

    test('on click: previous button should ask for the previous amount of items', async () => {

        const fakePaginationHandler = vi.fn((dto: CryptoTokenOptionalRequestDTO) => {
            expect(dto.amount).toEqual(-paginationAmount);
        });

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection,
            paginationHandler: fakePaginationHandler,
            defaultPaginationAmount: paginationAmount
        });

        const previousButton = component.getByTestId('pagination-component-previous-button');
        expect(previousButton).toBeDefined();

        await fireEvent.click(previousButton);
        expect(fakePaginationHandler).toHaveBeenCalledTimes(1);
    });

    test('on click: next button should ask for the next amount of items', async () => {
        const fakePaginationHandler = vi.fn((dto: CryptoTokenOptionalRequestDTO) => {
            expect(dto.amount).toEqual(paginationAmount);
        });

        await component.rerender({
            cryptoTokens: fakeCryptoTokensCollection,
            paginationHandler: fakePaginationHandler,
            defaultPaginationAmount: paginationAmount
        });

        const nextButton = component.getByTestId('pagination-component-next-button');
        expect(nextButton).toBeDefined();

        await fireEvent.click(nextButton);
        expect(fakePaginationHandler).toHaveBeenCalledTimes(1);
    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
