import { Component, PureComponent } from 'react';
import { myContext } from '@/context';
class Archives extends PureComponent {
  constructor(props, context) {
    super(props);
  }
  // static定义的就是静态属性，只能通过构造函数来进行调用
  static contextType = myContext;
  componentDidMount() {
    console.log(this.context, 'Archives');
    console.log('componentDidMount');
  }

  render() {
    return <div>4554</div>;
  }
}

export default Archives;
