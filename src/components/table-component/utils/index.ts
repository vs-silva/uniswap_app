import type {TableColumnDTO} from "../dtos/table-column.dto.ts";
import type {CryptoTokenDTO} from "../../../integration/cryto_tokens/core/dtos/crypto-token.dto.ts";
import {translate} from "../../../language_resources";

export function generateColumns(dto: CryptoTokenDTO[] | null): TableColumnDTO[] | null {
    if (!dto || dto.length === 0) {
        return null;
    }

    const languageResourceKeys: Record<string, string> = {
        name: 'component.table.header.column.name',
        symbol: 'component.table.header.column.symbol',
        totalSupplyAmount: 'component.table.header.column.totalSupply',
        totalValueLockedInUSD: 'component.table.header.column.totalValueInUSD',
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
