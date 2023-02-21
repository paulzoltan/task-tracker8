import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FaTrash } from 'react-icons/fa'

import IconButton from '../components/UI/IconButton'

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {},
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  kind: 'primary',
  children: <FaTrash />,
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: <FaTrash />,
}

export const SquarePrimary = Template.bind({})
SquarePrimary.args = {
  kind: 'primary',
  shape: 'square',
  children: <FaTrash />,
}

export const SquareSecondary = Template.bind({})
SquareSecondary.args = {
  shape: 'square',
  children: <FaTrash />,
}
