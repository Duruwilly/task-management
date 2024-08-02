import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import AddTask from "../AddTask";
import { store } from "../../store/store";

const meta: Meta<typeof AddTask> = {
  title: "AddTask",
  component: AddTask,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta

type Story = StoryObj<typeof AddTask>

export const Default: Story = {};
