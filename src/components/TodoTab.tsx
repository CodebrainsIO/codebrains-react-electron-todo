import React, { useEffect } from 'react';
import { Tabs, Layout, Row, Col, List } from 'antd';
import { Todo } from 'services/todoService';
import TodoItem from './TodoItem';

interface TodoTabProps {
  todos: Todo[];
  onTodoRemoval: (todo: Todo) => void;
  onTodoToggle: (todo: Todo) => void;
}
const TodoTab = ({ todos, onTodoRemoval, onTodoToggle }: TodoTabProps) => {
  return (
    <>
      <List
        locale={{
          emptyText: "There's nothing to do :(",
        }}
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem
            todo={todo}
            onTodoToggle={onTodoToggle}
            onTodoRemoval={onTodoRemoval}
          />
        )}
        pagination={{
          position: 'bottom',
          pageSize: 10,
        }}
      />
    </>
  );
};

export default TodoTab;
