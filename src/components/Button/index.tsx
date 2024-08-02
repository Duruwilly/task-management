import { ComponentProps } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ComponentProps<"button"> {}

const StyledButton = styled.button`
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

const Button = ({...props}: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
