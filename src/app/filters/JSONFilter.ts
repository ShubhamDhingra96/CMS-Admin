


export class JSONFilter {

    constructor() {

    }
    public parseJSON(httpresponse: any): any {
        return JSON.parse(httpresponse);
    }

    public stringifyJSON(parsejson:any):any{
        return JSON.stringify(parsejson);
    }
}