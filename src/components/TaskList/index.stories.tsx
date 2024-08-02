import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import TaskList from "../TaskList";
import { store } from "../../store/store";

const meta: Meta<typeof TaskList> = {
  title: "TaskList",
  component: TaskList,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta

type Story = StoryObj<typeof TaskList>

export const Default: Story = {};
