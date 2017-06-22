export class Task {
    id: number;
    title: string;
    complete: boolean = false;
    list_id: number;
    constructor(values: Object ={}) {
        Object.assign(this, values);
    }

    public setDone(): void {
        this.complete = false;
    }
}