import Todo from "../models/todo";

export default async function getTodoById(id) {

    try {
        const todo = await Todo.findById(id)
        const todoId = JSON.parse(JSON.stringify(todo))
        return todoId;
        
    } catch (error) {
        return null;
    }
}
