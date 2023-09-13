import {CryptoTokensService} from "./crypto-tokens.service.ts";
import {CryptoTokensServiceReaderAdapter} from "./adapters/crypto-tokens-service-reader.adapter.ts";

export default CryptoTokensService(CryptoTokensServiceReaderAdapter());
