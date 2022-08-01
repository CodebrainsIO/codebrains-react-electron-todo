/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable promise/always-return */
import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Layout, Row, Col, Input, message } from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
import {
  createTodo,
  deleteTodo,
  loadTodos,
  Todo,
  updateTodo,
} from '../services/todoService';

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleFormSubmit = (todo: Todo) => {
    console.log('Todo to create', todo);
    createTodo(todo).then(() => onRefresh());
    message.success('Todo added!');
  };

  const handleRemoveTodo = (todo: Todo) => {
    console.log('Todo to remove', todo);
    deleteTodo(todo.id).then(() => onRefresh());
    message.warn('Todo removed!');
  };

  const handleToggleTodoStatus = (todo: Todo) => {
    console.log('Todo to change', todo);
    todo.completed = !todo.completed;
    updateTodo(todo).then(() => onRefresh());
    message.info('Todo state updated!');
  };

  const refresh = () => {
    loadTodos()
      .then((json) => {
        setTodos(json);
        setActiveTodos(json.filter((todo: Todo) => todo.completed === false));
        setCompleteTodos(json.filter((todo: Todo) => todo.completed === true));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await loadTodos();
    setTodos(data);
    setActiveTodos(data.filter((todo: Todo) => todo.completed === false));
    setCompleteTodos(data.filter((todo: Todo) => todo.completed === true));
    setRefreshing(false);
    console.log('Refresh state', refreshing);
  }, [refreshing]);
  useEffect(() => {
    refresh();
  }, [onRefresh]);

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <div className="todolist">
          <Row>
            <Col span={14} offset={5}>
              <h1>Codebrains Todos</h1>

              <TodoForm onFormSubmit={handleFormSubmit} />
              <br />
              <Tabs defaultActiveKey="all">
                <TabPane tab="All" key="all">
                  <TodoTab
                    todos={todos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemoval={handleRemoveTodo}
                  />
                </TabPane>
                <TabPane tab="Active" key="active">
                  <TodoTab
                    todos={activeTodos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemoval={handleRemoveTodo}
                  />
                </TabPane>
                <TabPane tab="Complete" key="complete">
                  <TodoTab
                    todos={completeTodos}
                    onTodoToggle={handleToggleTodoStatus}
                    onTodoRemoval={handleRemoveTodo}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default TodoList;
