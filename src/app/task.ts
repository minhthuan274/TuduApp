import { Todo } from './todo';

export class Task {
    id: number;
    title: string;
    numTodos: number;
    todos: Todo[];
    constructor(values: Object={}){
        Object.assign(this, values);
    }
}