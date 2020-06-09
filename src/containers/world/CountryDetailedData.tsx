import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { FLAG_URL } from '../../service/ApiConstants';
import { CaseSummary } from '../../common/components/CaseSummary';
import { Card } from 'react-native-paper';

export default class CountryDetailedData extends React.PureComponent {
  componentDidMount() {
    const { params } = this.props.route;
    console.log(params);
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

  _renderComparisonStats = () => {
    const { country, total } = this.props.route.params;
    const percent = Number(
      (country.TotalConfirmed / total.TotalConfirmed) * 100
    ).toFixed(2);
    return (
      <Card style={{ margin: '2%' }}>
        <View style={{ alignItems: 'center', flex: 1, padding: '3%' }}>
          <Text style={[styles.enlargedText, { color: 'red' }]}>
            {percent}%
          </Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            of total confirmed cases from India
          </Text>
        </View>
      </Card>
    );
  };

  _renderPercentageStates = () => {
    const { country, total } = this.props.route.params;

    const deathPercent = Number(
      (country.TotalDeaths / country.TotalConfirmed) * 100
    ).toFixed(2);
    const recoveryPercent = Number(
      (country.TotalRecovered / country.TotalConfirmed) * 100
    ).toFixed(2);

    const relativePercent = Number(
      (country.TotalConfirmed / total.TotalConfirmed) * 100
    ).toFixed(2);

    return (
      <Card style={{ margin: 20 }}>
        <View style={{ alignItems: 'center', flex: 1, padding: '3%' }}>
          <Text>{country.Country} has </Text>
          <Text style={[styles.enlargedText, { color: 'red' }]}>
            {relativePercent}%
          </Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            of total confirmed cases globally
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, margin: '2%', alignItems: 'center' }}>
            <Text style={[styles.enlargedText, { color: 'green' }]}>
              {recoveryPercent}%
            </Text>
            <Text>{'Recovery Percentage'}</Text>
          </View>
          <View style={{ flex: 1, margin: '2%', alignItems: 'center' }}>
            <Text style={[styles.enlargedText, { color: 'grey' }]}>
              {deathPercent}%
            </Text>
            <Text>{'Death Percentage'}</Text>
          </View>
        </View>
      </Card>
    );
  };

  _renderStats = () => {
    const { country } = this.props.route.params;

    const totalActive =
      country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths;

    return (
      <CaseSummary
        active={totalActive}
        confirmed={country.TotalConfirmed}
        deltaConfirmed={country.NewConfirmed}
        recovered={country.TotalRecovered}
        deltaRecovered={country.NewRecovered}
        deaths={country.TotalDeaths}
        deltaDeaths={country.NewDeaths}
      />
    );
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this._renderHeader()}
        {this._renderPercentageStates()}
        {this._renderStats()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  enlargedText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
