export class List {
    id: number;
    title: string;
    user_id: number;
    constructor(values: Object={}){
        Object.assign(this, values);
    }
}