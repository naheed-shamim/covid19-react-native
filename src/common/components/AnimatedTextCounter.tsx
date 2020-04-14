import React from 'react';
import { Text } from 'react-native';

interface Props {
  fromValue: Number;
  toValue: Number;
}
interface State {
  counter: number;
  started: boolean;
}
export default class AnimatedTextCounter extends React.Component<Props, State> {
  interval: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      counter: 0,
      started: false,
    };
    this.interval = null;
  }
  componentDidMount() {
    this.setState({ started: !this.state.started }, () =>
      this._handleCounterIncrement()
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _handleCounterIncrement = () => {
    if (this.state.started) {
      this.interval = setInterval(() => {
        if (this.state.counter < this.props.toValue) {
          this.setState({
            counter: this.state.counter + 50,
          });
        } else {
          this.setState({ started: !this.state.started });
        }
      }, 1);
    } else {
      clearInterval(this.interval);
    }
  };

  render() {
    return <Text>{this.state.counter}</Text>;
  }
}
