import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const App = () => <div>123</div>;

function renderWithHotReload() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderWithHotReload();

if (module.hot) {
  module.hot.accept('./index.tsx', () => {
    renderWithHotReload();
  });
}
