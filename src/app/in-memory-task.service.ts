export class InMemoryTaskService {
    createDb() {
        const tasks = [
            {id: 0, title: "Thuan's", todos: [
                { id: 0, title: "Clean the house", complete: false},
                { id: 1, title: "Buy bread",       complete: false},
                { id: 2, title: "Plant tree",      complete: false},
                { id: 3, title: "Do homework",     complete: true},
            ]},
            {id: 1, title: "Binh's", todos: [
                { id: 0, title: "Buy meat",        complete: false},
                { id: 1, title: "Wash clothes",    complete: true},
                { id: 2, title: "Go sleep",        complete: true},
                { id: 3, title: "Buy watch",       complete: true},
            ]}
        ];
        return {tasks};
    }
}