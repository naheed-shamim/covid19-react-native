import React from 'react';
import { Button } from 'react-native';
import { InteractionManager } from 'react-native';
import LoadingSpinner from '../common/components/LoadingSpinner';

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.props.navigation.setOptions({
    //   headerRight: () => <Button title='Save' />,
    //   headerLeft: () => (
    //     <Button
    //       title='Save'
    //       onPress={() => this.props.navigation.toggleDrawer()}
    //     />
    //   ),
    // });
  }
  state = {
    loading: false,
  };

  _renderLoader = (isVisible: boolean) => {
    return <LoadingSpinner isVisible={isVisible} />;
  };
  //   state = {
  //     didFinishAnimating: false,
  //   };
  //   componentDidMount() {
  //     InteractionManager.runAfterInteractions(() => {
  //       console.log('IM called');
  //       this.setState({ didFinishAnimating: true });
  //     });
  //   }
  //   componentWillUnmount() {
  //     if (this.state.didFinishAnimating) {
  //       this.setState({ didFinishAnimating: false });
  //     }
}
