import React, { useEffect, useState } from 'react';
import './Home.css';
import addIcon from './add.png';
import TaskCard from './../../components/TaskCard/TaskCard';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('');

  const addTask = () => {
    if (newTask === '') {
      setError('Please enter a task');
      return;
    } else if (newTask.length < 5) {
      setError('Task should be at least 5 characters long');
      return;
    } else {
      setError('');
    }

    const newTaskObject = { title: newTask, category };
    setTasks([newTaskObject, ...tasks]);
    setNewTask('');
  };

  const saveTasksToLS = (tasksToSave) => {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveTasksToLS(newTasks);
  };

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    if (tasksFromLocalStorage) {
      setTasks(tasksFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    saveTasksToLS(tasks);
  }, [tasks]);

  return (
    <div>
      <h1 className='app-heading'>ToDo App</h1>
      <div className='tasks-container'>
        {tasks.map((task, i) => (
          <TaskCard
            title={task.title}
            category={task.category}
            key={i}
            delFunction={deleteTask}
            index={i}
          />
        ))}
      </div>
      <p className='errorMsg'>{error}</p>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Add a new text'
          className='input-text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <select
          className='category-select'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Category</option>
          <option value='🎓College'>🎓College</option>
          <option value='🛍️Shopping'>🛍️Shopping</option>
          <option value='👨🏻‍🏭Goals'>👨🏻‍🏭Goals</option>
          <option value='❤️‍🩹Health'>❤️‍🩹Health</option>
          <option value='🏫Learning'>🏫Learning</option>
          <option value='Other'>Other</option>
        </select>

        <img
          src={addIcon}
          alt='add'
          className='add-icon'
          onClick={addTask}
        />
      </div>
    </div>
  );
}

export default Home;
