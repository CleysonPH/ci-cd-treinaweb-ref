import { Todo } from '../domain/todo';
import { TodoNotFoundError } from '../errors/todo-not-found-error';
import { TodoRepository } from '../repositories/todo-repository';

export class SetTodoHasDoneById {

  constructor(private readonly _todoRepository: TodoRepository) {}

  async execute(id: number): Promise<Todo> {
    const todo = await this._todoRepository.getById(id);

    if (!todo) {
      throw new TodoNotFoundError();
    }

    todo.done = true;
    const updatedTodo = await this._todoRepository.update(todo, id);

    if (!updatedTodo) {
      throw new TodoNotFoundError();
    }

    return updatedTodo;
  }

}
