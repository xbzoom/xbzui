import * as React from 'react';

interface PageProps {
  /** 屏幕像素比 */
  pixelRatio?: number;
  /** 容器宽度 */
  width: number;
  /** 容器高度 */
  height: number;
  /** 子节点高度 */
  childHeight: number;
  /** 子节点总高度，用于滚动条 */
  childHeightTotal: number;
}

interface PageStates {
  /** 组件渲染的数据 */
  list: JSX.Element[];
  /** 滚动距离 */
  scrollTop: number;
}

export default class Virtuallist extends React.PureComponent<PageProps, PageStates> {
  /** 虚拟列表外容器dom */
  VL: HTMLDivElement | null;

  static defaultProps = {
    pixelRatio: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: this.getRenderDom(this.props.children, 0),
      scrollTop: 0,
    };
  }

  componentDidMount() {
    if (this.VL) {
      /** 绑定滚动事件 */
      this.VL.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (this.VL) {
      /** 卸载滚动事件 */
      this.VL.removeEventListener('scroll', this.onScroll);
    }
  }

  /** 滚动事件 */
  onScroll = (e: any) => {
    const {
      target: { scrollTop },
    } = e;
    const list = this.getRenderDom(this.props.children, scrollTop);
    this.setState({
      list,
      scrollTop,
    });
  };

  /** 获取当前滚动距离下，实际渲染的列表数据 */
  getRenderDom = (list, scrollTop: number) => {
    const { height, childHeight } = this.props;
    /** 视窗内显示的元素个数 */
    const count = Math.round(height / childHeight) + 1;
    return list.filter(
      (item: JSX.Element, index: number) =>
        (index + 1) * childHeight > scrollTop &&
        (index + 1) * childHeight < scrollTop + childHeight * (count + 1),
    );
  };

  render() {
    const { width, height, pixelRatio = 1, childHeightTotal } = this.props;
    const { list, scrollTop } = this.state;
    const className = 'xbzoom-virtual-list';
    return (
      <div
        className={className}
        style={{ width: width * pixelRatio, height: height * pixelRatio }}
        ref={(node: HTMLDivElement) => {
          this.VL = node;
        }}
      >
        <div className={`${className}--body`} style={{ height: childHeightTotal }}>
          <div
            className={`${className}--body--content`}
            style={{ transform: `translateY(${scrollTop * pixelRatio}px)` }}
          >
            {list}
          </div>
        </div>
      </div>
    );
  }
}
