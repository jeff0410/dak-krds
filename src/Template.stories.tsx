// Template.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

const Template = () => <div>Template</div>;

const meta: Meta<typeof Template> = {
  title: "Example/Template",
  component: Template,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

export const Default: Story = {
  name: "스토리",
  args: {},
};

export const RenderStory: Story = {
  name: "스토리(Render)",
  render: () => <Template />,
};
