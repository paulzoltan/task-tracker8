import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FaBell } from 'react-icons/fa'

import Switch from '../components/UI/Switch'

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const On = Template.bind({})
On.args = {
  defaultChecked: true,
  children: <FaBell />,
}

export const Off = Template.bind({})
Off.args = {
  defaultChecked: false,
  children: <FaBell />,
}

export const DisabledOn = Template.bind({})
DisabledOn.args = {
  defaultChecked: true,
  disabled: true,
  children: <FaBell />,
}
export const DisabledOff = Template.bind({})
DisabledOff.args = {
  defaultChecked: false,
  disabled: true,
  children: <FaBell />,
}
