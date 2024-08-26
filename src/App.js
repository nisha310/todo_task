import React, { useState } from 'react';
import { Button, Input, List, Checkbox, Radio, Typography } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS
import './App.css'; // Import Tailwind CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'completed', 'pending'

  const addTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { id: Date.now(), name: taskName, completed: false }]);
      setTaskName('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });

  return (
    <div className="app-container p-6">
      <Typography className='text-[24px] text-center font-bl'>To Do List</Typography>
      <div className="input-container mb-4">
      <Typography className='text-[16px]'>Task Name</Typography>

        <Input
        title='Task Name'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="mb-2"
        />
        <Button type="primary" onClick={addTask}>Add Task</Button>
      </div>
      <div className="filter-container mb-4">
        <Radio.Group onChange={(e) => setFilter(e.target.value)} value={filter}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="completed">Completed</Radio.Button>
          <Radio.Button value="pending">Pending</Radio.Button>
        </Radio.Group>
      </div>
      <List
        bordered
        dataSource={filteredTasks}
        renderItem={task => (
          <List.Item
            actions={[
              <Button
                type={task.completed ? '' : 'primary'}
                className={task.completed ? 'bg-green-500 text-white cursor-not-allowed hover:bg-green-500' : 'bg-blue-500 text-white'}
                onClick={() =>{
                 toggleTaskCompletion(task.id)}}
               
              >
                {task.completed ? 'Completed' : 'Mark as Completed'}
              </Button>,
              <Button
                danger
                onClick={() => deleteTask(task.id)}
                
              >
                Delete
              </Button>,
            ]}
            className="task-item"
          >
            <Checkbox className={`${task.completed ? "cursor-not-allowed": ""}`} checked={task.completed}>{task.name}</Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
