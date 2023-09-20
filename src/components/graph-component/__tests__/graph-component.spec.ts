import {afterAll, beforeAll, vi, describe, expect, test} from "vitest";
import {cleanup, render, fireEvent ,RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import GraphComponent from "../graph-component/index.vue";

describe("Components: Graph component tests", () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(GraphComponent);
    });

    test('should contain component container', () => {
        expect(() => component.getByTestId('detail-component-container')).toBeDefined();
    });

});
