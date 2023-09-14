import {defineStore} from "pinia";
import {CryptoTokensStore, CryptoTokensStoreIdentifier} from "./crypto-tokens-store";

export default {
    useCryptoTokensStore: defineStore(CryptoTokensStoreIdentifier, CryptoTokensStore)
};
