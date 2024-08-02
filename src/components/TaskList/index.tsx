import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../store/store';
import { fetchTasks, updateTask } from '../../store/reducers/task-reducers';
import { Task } from '../../common.type';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleCompletion = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <TaskItem key={task.id}>
          <span>{task.title}</span>
          <Button onClick={() => handleToggleCompletion(task)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
        </TaskItem>
      ))}
    </Container>
  );
};

export default TaskList;
