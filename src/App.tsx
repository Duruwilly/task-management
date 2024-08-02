import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10%
`;

function App() {
  return (
    <Container>
      <AddTask />
      <TaskList />
    </Container>
  );
}

export default App;
