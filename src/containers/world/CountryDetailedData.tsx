import React from 'react';
import { View, Image, Text } from 'react-native';
import { FLAG_URL } from '../../service/ApiConstants';

export default class CountryDetailedData extends React.PureComponent {
  componentDidMount() {
    const { params } = this.props.route;
    // console.log(params);
  }

  _renderHeader = () => {
    const { CountryCode, Country } = this.props.route.params.country;
    const flagURL = FLAG_URL(CountryCode, 64);
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: flagURL }}
          style={{ height: 84, aspectRatio: 1 }}
        />
        <Text>{Country}</Text>
      </View>
    );
  };

  _renderStats = () => {
    const {
      NewConfirmed,
      NewDeaths,
      NewRecovered,
    } = this.props.route.params.country;

    const { total, country } = this.props.route.params;

    const confirmedProportion = Number(
      (country.TotalConfirmed / total.TotalConfirmed) * 100
    ).toFixed(4);
    return (
      <View>
        <Text>{confirmedProportion}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this._renderHeader()}
        {this._renderStats()}
      </View>
    );
  }
}
