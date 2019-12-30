import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { SelectCity, Zimage } from '../components';
import '../components/select-city/style';
import '../components/zimage/style';
import address from '../components/assets/address.json';
import touxiang from '../components/assets/images/touxiang.jpg';

const App = () => (
  <div>
    <SelectCity
      params={{
        level: 2,
        deepMap: [{ name: '省' }, { name: '市' }],
        address,
        search: true,
        onChange: (selectVal, selectName) => {
          console.log(selectVal, selectName);
        },
      }}
    />
    <Zimage srcs={[touxiang]} />
  </div>
);

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
