import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../store/store";
import { addTask } from "../../store/reducers/task-reducers";

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

const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const AddTask: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTask(title));
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
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddTask;
