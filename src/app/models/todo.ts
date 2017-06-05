export class Todo {
    id: number;
    title: string;
    isComplete: boolean = false;
    belongs_to: number;
    constructor(values: Object ={}) {
        Object.assign(this, values);
    }

    public setDone(): void {
        this.isComplete = false;
    }
}