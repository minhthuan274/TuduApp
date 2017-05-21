import { Todo } from './todo';

export class Task {
    id: number;
    title: string;
    constructor(values: Object={}){
        Object.assign(this, values);
    }
}