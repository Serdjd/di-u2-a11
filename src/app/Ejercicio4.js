import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';
import next from 'next';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Comprar leche', done: true },
  { id: 1, title: 'Comer tacos', done: false },
  { id: 2, title: 'Preparar té', done: false },
];

export default function TaskApp() {
  const [todos, UpdateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    UpdateTodos( draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    })
  }

  function handleChangeTodo(nextTodo) {
    const index = todos.findIndex(t =>
      t.id === nextTodo.id
    );
    UpdateTodos( draft => {
      draft[index].title = nextTodo.title,
      draft[index].done = nextTodo.done
    })
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    UpdateTodos( draft => {
      draft.splice(index,1)
    })
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
