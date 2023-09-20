export default {
    hello: 'EN hello from the world 123',
    component: {
        table: {
            header: {
                column: {
                    name: 'Name',
                    symbol: 'Symbol',
                    totalSupply: 'Total Supply',
                    totalValueInUSD: 'Total Locked Value in US Dollars'
                }
            }
        },
        pagination: {
            previous: 'Previews',
            next: 'Next'
        },
        detail: {
            button: {
                close: 'Close'
            },
            list: {
                name: 'Name',
                symbol: 'Symbol',
                totalSupply: 'Total Supply',
                totalValueInUSD: 'Total Locked Value in US Dollars',
                feesInUSD: 'Fees in US Dollars',
                volume: 'Volume',
                volumeInUSD: 'Volume in US Dollars',
                untrackedVolumeInUSD: 'Untracked volume in US Dollars',
                poolCount: 'Pool count',
                derivedETH: 'Derived ETH',
                name_description: 'Token name',
                symbol_description: 'Token symbol',
                totalSupply_description: 'Total supply of liquidity token distributed to LPs',
                totalValueInUSD_description: 'Total Locked Value in US Dollars',
                feesInUSD_description: 'Total fees value in US Dollars',
                volume_description: 'Total amount swapped all time in this pair',
                volumeInUSD_description: 'Total amount swapped all time in this pair stored in USD (only tracked if USD liquidity is above minimum threshold)',
                untrackedVolumeInUSD_description: 'Total amount swapped all time in this pair stored in USD, no minimum liquidity threshold',
                poolCount_description: 'Total pools on Uniswap',
                derivedETH_description: 'ETH per token',
            }
        }
    }
};
