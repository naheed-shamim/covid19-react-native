import React, { Component, Fragment } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Theme } from '../VisualTheme';

/**
 * Returns the Component for Loading Spinner
 * @param {*} label |  String
 * @param {*} color |  String
 */
const WithLoadingSpinner = (label = '', color = Theme.PRIMARY_ACCENT) => (
  WrappedComponent
) => {
  return class WithLoadingSpinner extends Component {
    constructor(props) {
      super(props);
      this.state = {
        makeDialogVisible: false,
      };
      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    showDialog(isVisible) {
      if (isVisible || (!isVisible && this._isMounted)) {
        this.setState({ makeDialogVisible: isVisible });
      }
    }

    render() {
      // inject the wrapped component with toggleHandler
      const loadingSpinnerProps = {
        ...this.props,
        withLoader: this.showDialog.bind(this),
      };
      return (
        <Fragment>
          <WrappedComponent {...loadingSpinnerProps} />
          <LoadingSpinner isVisible={this.state.makeDialogVisible} />
        </Fragment>
      );
    }
  };
};

export default WithLoadingSpinner;
