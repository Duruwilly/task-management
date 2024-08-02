import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../store/store";
import { fetchTasks, updateTask } from "../../store/reducers/task-reducers";
import { Task } from "../../common.type";
import Button from "../Button";

const Container = styled.div`
  padding: 20px;
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

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleCompletion = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }))
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem key={task._id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "grey" : "black",
            }}
          >
            {task.title}
          </span>
          <Button
            disabled={task.completed}
            onClick={() => handleToggleCompletion(task)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              background: task.completed ? "grey" : "",
            }}
            children="Mark complete"
          />
        </TaskItem>
      ))}
    </Container>
  );
};

export default TaskList;
