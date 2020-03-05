import * as React from 'react';
import { render } from 'react-dom';
import * as classnames from 'classnames';
import { AppContainer } from 'react-hot-loader';
import { VirtualList } from '../components';
import '../components/virtual-list/style';

const data: number[] = [];

for (let i = 1; i <= 100000; i++) {
  data.push(i);
}

const list: JSX.Element[] = data.map((item: number) => (
  <div
    className={classnames({
      'xbzoom-virtual-list--body--content--row': true,
      'xbzoom-virtual-list--body--content--row--last': item === 1000,
    })}
    key={item}
  >
    {item}
  </div>
));

const App = () => (
  <VirtualList width={500} height={300} childHeight={30} childHeightTotal={30 * list.length}>
    {list}
  </VirtualList>
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
