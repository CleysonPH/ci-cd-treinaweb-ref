import { beforeEach, describe, expect, it } from 'vitest';
import { Todo } from '../domain/todo';
import { TodoNotFoundError } from '../errors/todo-not-found-error';
import { InMemoryTodoRepository } from '../repositories/in-memory/in-memory-todo-repository';
import { TodoRepository } from '../repositories/todo-repository';
import { SetTodoHasDoneById } from './set-todo-has-done-by-id';

describe('GetTodoByIdUseCase (Unit)', () => {
  let sut: SetTodoHasDoneById;
  let todoRepository: TodoRepository;
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      {
        id: 1,
        title: 'Todo 1',
        description: 'Todo 1 description',
        done: false
      },
      {
        id: 2,
        title: 'Todo 2',
        description: 'Todo 2 description',
        done: false
      },
      {
        id: 3,
        title: 'Todo 3',
        description: 'Todo 3 description',
        done: false
      }
    ];
    todoRepository = new InMemoryTodoRepository(todos);
    sut = new SetTodoHasDoneById(todoRepository);
  });

  it('should return a todo when a valid id is provided', async () => {
    const todo = await sut.execute(1);
    expect(todo).toEqual({ ...todos[0], done: true });
  });

  it('should throw an error when an invalid id is provided', async () => {
    const expectedError = new TodoNotFoundError();
    await expect(sut.execute(4)).rejects.toThrow(expectedError);
  });
});
