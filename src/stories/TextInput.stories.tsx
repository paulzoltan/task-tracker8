import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TextInput from '../components/UI/TextInput'

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Filled = Template.bind({})
Filled.args = {
  value: 'Definitely not placeholder',
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Write Here Something!',
}

export const Empty = Template.bind({})
Empty.args = {}
