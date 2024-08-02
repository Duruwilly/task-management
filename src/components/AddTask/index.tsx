import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../store/store";
import { addTask } from "../../store/reducers/task-reducers";
import Button from "../Button";
import { Task } from "../../common.type";

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddTask: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskTitle = tasks.find((task) => task.title === title);
    if (taskTitle) {
      alert("Task with the same title already exists");
    } else {
      dispatch(addTask(title));
    }
    setTitle("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
        required
      />
      <Button
        style={{ paddingRight: "30px", paddingLeft: "30px" }}
        type="submit"
        children="Add"
      />
    </Form>
  );
};

export default AddTask;
