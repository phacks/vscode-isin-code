interface OpenFIGIItem {
    "figi": string;
    "name": string;
    "ticker": string;
    "exchCode": string;
    "compositeFIGI": string;
    "uniqueID": string;
    "securityType": string;
    "marketSector": string;
    "shareClassFIGI": string;
    "uniqueIDFutOpt": string;
    "securityType2": string;
    "securityDescription": string;
}

interface OpenFIGIAPIData {
    [index: number]: OpenFIGIItem;
}

export interface OpenFIGIAPIResponse {
    [index: number]: {
        data: OpenFIGIAPIData;
    };
}