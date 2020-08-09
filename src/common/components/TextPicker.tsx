// import { Picker } from '@react-native-community/picker';
import React, { PureComponent } from 'react';
import {
  Animated,
  Picker,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type ReactText = string | number;

interface TextPickerProps {
  ref: string;
  defaultStatus?: string;
  onSubmit: (option: string) => void;
  options: Array<string>;
  shouldOverlayDismiss: boolean;
  labels?: Array<string>;
  onCancel?: (option: string) => void;
}

interface TextPickerState {
  translateY: Animated.Value;
  modalVisible: boolean;
  selectedPosition: number;
  selectedOption: string;
}

export default class TextPicker extends PureComponent<
  TextPickerProps,
  TextPickerState
> {
  constructor(props: TextPickerProps) {
    super(props);
    this.state = {
      translateY: new Animated.Value(0),
      modalVisible: false,
      selectedOption: this.props.defaultStatus,
      selectedPosition: 0,
    };
  }

  // Hide Picker View
  hidePicker = () => {
    Animated.timing(this.state.translateY, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => this.setState({ modalVisible: false }));
  };

  // Show Picker View
  showPicker = () => {
    this.setState({
      modalVisible: true,
    });
    Animated.timing(this.state.translateY, {
      duration: 200,
      toValue: Platform.OS === 'ios' ? -216 : -85,
      useNativeDriver: true,
    }).start();
  };

  // On Done Pressed
  onPressDone = () => {
    const { options } = this.props;
    const { selectedPosition } = this.state;

    this.setState({
      selectedOption: options[selectedPosition],
    });
    if (this.props.onSubmit) {
      this.props.onSubmit(options[selectedPosition]);
    }
    this.hidePicker();
  };

  // On Cancel Pressed
  onPressCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this.state.selectedOption);
    }
    this.hidePicker();
  };

  // Overlay for IOS
  onOverlayDismiss = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this.state.selectedOption);
    }
    this.hidePicker();
  };

  // On value change
  onValueChange = (itemValue: ReactText, itemIndex: number) => {
    this.setState({
      selectedOption: itemValue.toString(),
      selectedPosition: itemIndex,
    });
  };

  renderItem(option: string, index: number) {
    const label = this.props.labels ? this.props.labels[index] : option;
    return <Picker.Item key={option} value={option} label={label} />;
  }

  render() {
    const { modalVisible, selectedOption, translateY } = this.state;
    const { options, shouldOverlayDismiss = true } = this.props;
    const transformStyle = {
      transform: [{ translateY }],
    };

    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={this.onPressCancel}
        supportedOrientations={['portrait', 'landscape']}
      >
        <TouchableWithoutFeedback
          disabled={!shouldOverlayDismiss}
          onPress={this.onOverlayDismiss}
        >
          <View style={styles.overlayContainer} />
        </TouchableWithoutFeedback>
        <SafeAreaView>
          <Animated.View style={[styles.modalContainer, transformStyle]}>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.onPressCancel}
              >
                <Text style={styles.buttonTextStyle}>{'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.onPressDone}
              >
                <Text style={styles.buttonTextStyle}>{'Done'}</Text>
              </TouchableOpacity>
            </View>
            <Picker
              style={styles.bottomPicker}
              selectedValue={selectedOption}
              onValueChange={this.onValueChange}
            >
              {options
                ? options.map((option, index) => this.renderItem(option, index))
                : null}
            </Picker>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlayContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.3,
  },
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
    height: 40,
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#0000ff',
    fontSize: 14,
  },
  bottomPicker: {
    width: Dimensions.get('window').width,
  },
});
