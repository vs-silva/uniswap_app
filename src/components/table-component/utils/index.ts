import type {TableColumnDTO} from "../dtos/table-column.dto.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {translate} from "../../../language_resources";
import {TableComponentConstants} from "../constants/table-component.constants.ts";

export function generateColumns(dto: CryptoTokenDTO[] | null): TableColumnDTO[] | null {
    if (!dto || dto.length === 0) {
        return null;
    }

    const languageResourceKeys: Record<string, string> = {
        name: TableComponentConstants.LANGUAGE_RESOURCE_KEY_NAME,
        symbol: TableComponentConstants.LANGUAGE_RESOURCE_KEY_SYMBOL,
        totalSupplyAmount: TableComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_SUPPLY,
        totalValueLockedInUSD: TableComponentConstants.LANGUAGE_RESOURCE_KEY_TOTAL_VALUE_IN_USD,
    };

    const res: TableColumnDTO[] = [];

    for (const key of Object.keys(dto[0])) {
        if (key !== 'id') {
            res.push({
                id: key,
                name: translate(languageResourceKeys[key])
            });
        }
    }

    return res.length > 0 ? res : null;
}

