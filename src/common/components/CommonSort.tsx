import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../constants/Constants';
import TextPicker from './TextPicker';

export const SortOptions = {
  Name: 'Title',
  Confirmed: 'Confirmed',
  Recovered: 'Recovered',
  Deaths: 'Deaths',
};

interface CommonSortProps {
  defaultValue: string,
  isAscending: boolean,
  handleSortSelection: (selection: string) => void;
  onComparatorSelection: (selection: boolean) => void
}

export default class CommonSort extends PureComponent<CommonSortProps, {}> {

  render() {
    const options = [
      SortOptions.Name,
      SortOptions.Confirmed,
      SortOptions.Recovered,
      SortOptions.Deaths,
    ];

    const { handleSortSelection, isAscending, onComparatorSelection, themeColors } = this.props

    const compartorText = isAscending ? 'ASC' : 'DSC';
    return (
      <View>
        <TextPicker
          ref={'picker'}
          defaultStatus={this.props.defaultValue}
          shouldOverlayDismiss={false}
          options={options}
          onSubmit={(value) => handleSortSelection(value)}
        />
        <View style={{
          flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.refs.picker.showPicker()}>
            <Text style={{ marginRight: '3%', color: themeColors.text }}>{this.props.defaultValue}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '4%',

            }}
            onPress={() => onComparatorSelection(!isAscending)}
          // TODO:CHECK THIS
          >
            <Text style={{ padding: '1%', color: themeColors.text, textAlign: 'center' }}>{compartorText}</Text>
            <Image source={icons.sortHoriz} style={{ height: 24, width: 24, tintColor: themeColors.text }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
