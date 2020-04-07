import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { SquareColoredRowItem } from './SquareColoredRowItem';

class HomeScreen extends Component {
  state = {
    genericData: [],
  };
  componentDidMount() {
    this._fetchGenericData();
  }
  _fetchGenericData = async () => {
    const { statewise } = await CovidService.getGenericStats(
      this.props.withLoader
    );
    this.setState({ genericData: statewise });
  };

  _generateGenericData = (covidData: Array): Array<Object> => {
    if (covidData == null || covidData.length == 0) return [];
    else {
      const { active, confirmed, deaths, recovered } = covidData[0];

      return [
        { label: 'Confirmed', value: confirmed, color: 'red' },
        { label: 'Active', value: active, color: 'blue' },
        { label: 'Recovered', value: recovered, color: 'green' },
        { label: 'Deaths', value: deaths, color: 'grey' },
      ];
    }
  };

  render() {
    const flatListData = this._generateGenericData(this.state.genericData);
    // const stateWiseData =
    return (
      <View>
        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
          {'COVID-19 Tracker'}
        </Text>

        <FlatList
          data={flatListData}
          renderItem={({ item, index }) => (
            <SquareColoredRowItem
              label={item.label}
              value={item.value}
              color={item.color}
            />
          )}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <FlatList

        </FlatList> */}
      </View>
    );
  }
}

export default WithLoadingSpinner()(HomeScreen);
