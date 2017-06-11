export class Task {
    id: number;
    title: string;
    isComplete: boolean = false;
    list_id: number;
    constructor(values: Object ={}) {
        Object.assign(this, values);
    }

    public setDone(): void {
        this.isComplete = false;
    }
}