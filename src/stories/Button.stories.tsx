import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../components/UI/Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  kind: 'primary',
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
}
