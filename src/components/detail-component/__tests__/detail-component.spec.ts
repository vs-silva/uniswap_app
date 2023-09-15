import {afterAll, beforeAll, vi, describe, expect, test} from "vitest";
import {cleanup, render, fireEvent ,RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import DetailComponent from "../index.vue";
import EventBusEngine from "../../../engines/event-bus-engine";
import {CryptoTokenStoreEventTypeConstants} from "../../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";

describe("Components: Detail component tests", () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(DetailComponent);
    });

    test('should contain component container', () => {
        expect(() => component.getByTestId('detail-component-container')).toBeDefined();
    });

    test('should contain component close button and should not contain component body', () => {
        expect(() => component.getByTestId('detail-component-close-button')).toBeDefined();
        expect(() => component.getByTestId('detail-component-body')).toThrowError();
    });

    test('should open when display crypto token details event is emitted with CryptoTokenDTO dto', async () => {

        const fakeButtonClickHandler = vi.fn(() => {
            EventBusEngine.emit(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS, <CryptoTokenDTO>{
                id: faker.database.mongodbObjectId(),
                name: faker.finance.currencyName(),
                symbol: faker.finance.currencySymbol(),
                totalSupplyAmount: faker.number.int({min: 100, max: 300}),
                totalValueLockedInUSD: faker.number.float({min: 1, max: 3000, precision: 2})
            });
        });

        const fakeUIButton = document.createElement("button");
        fakeUIButton.type = "button";
        fakeUIButton.onclick = fakeButtonClickHandler;

        await fireEvent.click(fakeUIButton);
        expect(fakeButtonClickHandler).toHaveBeenCalledTimes(1);

        expect(() => component.getByTestId('detail-component-body')).toBeDefined();
    });

    test('should close and clean the crypto token details when the close button is clicked', async () => {

        const componentCloseButton = component.getByTestId('detail-component-close-button');
        expect(componentCloseButton).toBeDefined();

        await fireEvent.click(componentCloseButton);
        expect(() => component.getByTestId('detail-component-body')).toThrowError();
    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
