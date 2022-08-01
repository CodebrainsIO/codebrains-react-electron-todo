import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import TodoList from 'components/TodoList';
import icon from '../../assets/icon.svg';
import './App.css';


const Hello = () => {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
  );
}
