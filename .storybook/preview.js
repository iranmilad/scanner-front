// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }

import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import configureStore from '../src/redux/store';

function ThemeWrapper(props) {
  const store = configureStore();
  return (
    <Provider store={store}>
      <MantineProvider>{props.children}</MantineProvider>
    </Provider>
  );
}

export const decorators = [
  (renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
