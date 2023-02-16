import '!style-loader!css-loader!../src/reset.css'
import '!style-loader!css-loader!../src/index.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: '#e4ebf5',
      },
    ],
  },
}
