const baseUrl = `http://localhost:8000/todos`;

export interface Todo {
  id?: number | string;
  title: string;
  completed: boolean;
}

export const loadTodos = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const getTodo = (id: Todo) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const createTodo = (todo: Todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed,
    }),
  }).then((res) => res.json());
};

export const updateTodo = (todo: Todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }),
  });
};

export const deleteTodo = (id: number | string | undefined) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
};
