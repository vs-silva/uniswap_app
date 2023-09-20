import {afterAll, beforeAll, vi, describe, expect, test} from "vitest";
import {cleanup, render, fireEvent ,RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import DetailComponent from "../index.vue";
import EventBusEngine from "../../../engines/event-bus-engine";
import {CryptoTokenStoreEventTypeConstants} from "../../../store/crypto-tokens-store/constants/crypto-token-store-event-type.constants.ts";
import type {CryptoTokenDetailDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token-detail.dto.ts";
import type {CryptoTokenOptionalRequestDTO} from "../../../store/crypto-tokens-store/dtos/crypto-token-optional-request.dto.ts";

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

        let fakeCryptoTokenDetailDTO: CryptoTokenDetailDTO | null = null;

        async function fakeCryptoTokenDetailsRequestActionHandler(name: string): Promise<void> {
            expect(name).toEqual(fakeCryptoTokenRequestedDetails.name);

            fakeCryptoTokenDetailDTO = {
                id: faker.database.mongodbObjectId(),
                name: name,
                symbol: faker.finance.currencySymbol(),
                totalSupplyAmount: faker.number.int({min: 100, max: 300}),
                totalValueLockedInUSD: faker.number.int({min: 100, max: 300}),
                poolCount: faker.number.int({min: 1, max: 9}),
                volume: faker.number.int({min: 10, max: 20}),
                volumeInUSD: faker.number.int({min: 100, max: 200}),
                untrackedVolumeInUSD: faker.number.int({min: 100, max: 200}),
                feesInUSD: faker.number.int({min: 100, max: 200}),
                derivedETH: faker.number.int({min: 1, max: 9}),
            };

            await component.rerender({
                cryptoTokenDetails: fakeCryptoTokenDetailDTO
            });

            expect(() => component.getByTestId('detail-component-body')).toBeDefined();
            expect(() => component.getByTestId('detail-component-body-details')).toBeDefined();
        }

        await component.rerender({
            cryptoTokenDetailsRequestActionHandler: fakeCryptoTokenDetailsRequestActionHandler,
            cryptoTokenDetails: fakeCryptoTokenDetailDTO
        });

        const fakeCryptoTokenRequestedDetails = <CryptoTokenOptionalRequestDTO>{
            id: faker.database.mongodbObjectId(),
            name: 'UMIIE COIN',
            symbol: faker.finance.currencySymbol(),
            totalSupplyAmount: faker.number.int({min: 100, max: 300}),
            totalValueLockedInUSD: faker.number.float({min: 1, max: 3000, precision: 2})
        };

        const fakeEmitterUIButtonClickHandler = vi.fn(() => {
            EventBusEngine.emit(CryptoTokenStoreEventTypeConstants.DISPLAY_CRYPTO_TOKEN_DETAILS,fakeCryptoTokenRequestedDetails);
        });

        const fakeEmitterUIButton = document.createElement("button");
        fakeEmitterUIButton.type = "button";
        fakeEmitterUIButton.onclick = fakeEmitterUIButtonClickHandler;

        await fireEvent.click(fakeEmitterUIButton);
        expect(fakeEmitterUIButtonClickHandler).toHaveBeenCalledTimes(1);

        expect(() => component.getByTestId('detail-component-body')).toBeDefined();

    });

    test('should close and clean the crypto token details when the close button is clicked', async () => {

        const componentCloseButton = component.getByTestId('detail-component-close-button');
        expect(componentCloseButton).toBeDefined();

        componentCloseButton.onclick = async (): Promise<void> => {
            await component.rerender({
                cryptoTokenDetailsRequestActionHandler: () => {},
                cryptoTokenDetails: null
            });
        };

        await fireEvent.click(componentCloseButton);
        expect(() => component.getByTestId('detail-component-body')).toThrowError();
    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
