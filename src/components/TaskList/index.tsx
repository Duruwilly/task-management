import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchTasks,
  setFilter,
  updateTask,
} from "../../store/reducers/task-reducers";
import { FilterState, Task } from "../../common.type";
import Button from "../Button";
import FilterSelect from "../Filter";

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [filterVal, setFilterVal] = useState<FilterState>(FilterState.All);
  const { tasks, loading, filter } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleToggleCompletion = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleSetFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilterState;
    setFilterVal(value);
    dispatch(setFilter(value));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>
        <h2>Tasks</h2>
        <FilterSelect filterVal={filterVal} onChange={handleSetFilter} />
      </Header>
      {filteredTasks.map((task) => (
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
