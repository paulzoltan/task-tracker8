import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkbox from '../components/UI/Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
)

export const Checked = Template.bind({})
Checked.args = {
  defaultChecked: true,
}

export const Unchecked = Template.bind({})
Unchecked.args = {
  defaultChecked: false,
}
