import Todo from "../models/todo";

export default async function getTodo() {

    try {
        let todo = await Todo.find();
        todo = JSON.parse(JSON.stringify(todo));
        return todo;
    } catch (error) {
        return null;
    }
}
