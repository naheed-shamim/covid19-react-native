import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Colors } from '../../common/VisualTheme';
import { formatDate, toCommas } from '../../utils/CommonUtils';
import { MemoizedLastUpdatedTime } from '../../common/components/CommonElements';
import { CaseSummary } from '../../common/components/CaseSummary';

export class StateDetailedData extends React.Component {
  _renderStateSpecificData = () => {
    const { state } = this.props.route.params;
    const lastUpdatedTime = formatDate(state.lastupdatedtime);
    return (
      <View>
        {this._renderDetailView()}
        <MemoizedLastUpdatedTime lastUpdatedTime={lastUpdatedTime} />
      </View>
    );
  };

  _renderStateToIndiaComparison = () => {
    const { state, total } = this.props.route.params;
    const percent = Number((state.confirmed / total.confirmed) * 100).toFixed(
      2
    );
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

  _renderCaseSummary = () => {
    const { state } = this.props.route.params;

    return (
      <CaseSummary
        active={state.active}
        confirmed={state.confirmed}
        deltaConfirmed={state.deltaconfirmed}
        recovered={state.recovered}
        deltaRecovered={state.deltarecovered}
        deaths={state.deaths}
        deltaDeaths={state.deltadeaths}
      />
    );
  };

  _renderPercentageStates = () => {
    const { state, total } = this.props.route.params;

    const deathPercent = Number((state.deaths / state.confirmed) * 100).toFixed(
      2
    );
    const recoveryPercent = Number(
      (state.recovered / state.confirmed) * 100
    ).toFixed(2);

    const relativePercent = Number(
      (state.confirmed / total.confirmed) * 100
    ).toFixed(2);

    return (
      <Card style={{ margin: '2%' }}>
        <View style={{ alignItems: 'center', flex: 1, padding: '3%' }}>
          <Text>{state.state} has </Text>
          <Text style={[styles.enlargedText, { color: 'red' }]}>
            {relativePercent}%
          </Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            of total confirmed cases from India
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

  _renderDetailView = () => {
    const { district, state } = this.props.route.params;
    const { districtData } = district;
    return (
      <View style={{ margin: '1%' }}>
        <Text>District Data</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.districtText}>District</Text>
          <Text style={styles.districtConfirmedTxt}>Confirmed</Text>
        </View>
        {Object.keys(districtData).map((item, i) => {
          const rowColor = i % 2 == 0 ? '#fff' : '#1110';
          return (
            <View
              style={[styles.districtContainer, { backgroundColor: rowColor }]}
              key={i}
            >
              <Text style={styles.districtText}>{item}</Text>
              <Text style={styles.districtConfirmedTxt}>
                {toCommas(districtData[item].confirmed)}
              </Text>
            </View>
          );
        })}
        <Card>
          <View style={styles.districtContainer}>
            <Text style={[styles.districtText, styles.enlargedText]}>
              Total
            </Text>
            <Text style={[styles.districtConfirmedTxt, styles.enlargedText]}>
              {toCommas(state.confirmed)}
            </Text>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    console.log(this.props);
    const { state } = this.props.route.params;

    return (
      <ScrollView style={{ flex: 1 }}>
        {this._renderPercentageStates()}
        {this._renderCaseSummary()}
        {this._renderStateSpecificData()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  districtContainer: {
    flexDirection: 'row',
    padding: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
  },
  districtText: {
    fontSize: 14,
    marginLeft: '5%',
    flex: 2,
    color: Colors.black,
  },
  districtConfirmedTxt: {
    flex: 1,
    color: Colors.black,
    textAlign: 'center',
  },
  enlargedText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
