import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import TextPicker from './TextPicker';
import { icons } from '../../constants/Constants';
import { PureComponent } from 'react';

export const SortOptions = {
  Name: 'Name',
  Confirmed: 'Confirmed',
  Recovered: 'Recovered',
  Deaths: 'Deaths',
};

interface CommonSortProps {
  handleSortSelection: (selection: string) => void;
}

export default class CommonSort extends PureComponent<CommonSortProps, {}> {
  render() {
    const options = [
      SortOptions.Name,
      SortOptions.Confirmed,
      SortOptions.Recovered,
      SortOptions.Deaths,
    ];
    return (
      <View>
        <TextPicker
          ref={'picker'}
          shouldOverlayDismiss={false}
          options={options}
          onSubmit={(value) => this.props.handleSortSelection(value)}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginHorizontal: '4%',
          }}
          onPress={() => this.refs.picker.showPicker()}
        >
          <Image source={icons.sortHoriz} style={{ height: 24, width: 24 }} />
          <Text style={{ marginLeft: '4%' }}>{'Sort'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
