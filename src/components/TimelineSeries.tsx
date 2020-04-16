import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

import { strings } from '../constants/Strings';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CustomLineChart } from '../common/components/Charts';

class TimelineSeries extends Component {
  constructor(props) {
    super(props);
  }
  state = { timeLineSeries: [] };

  componentDidMount() {
    this._fetchTimeLine();
  }

  _fetchTimeLine = async () => {
    const { cases_time_series } = await CovidService.getGenericStats(
      this.props.withLoader
    );
    this.setState({ timeLineSeries: cases_time_series });
  };

  render() {
    const { timeLineSeries = [] } = this.state;

    let confirmedLabelArray: any[] = [];
    let confirmedArray: any[] = [];
    let deathsLabelArray: any[] = [];
    let deathsArray: any[] = [];
    let recoveredLabelArray: any[] = [];
    let recoveredArray: any[] = [];
    let totalDates = 1;
    let dateInterval: number = 1;

    if (timeLineSeries.length > 0) {
      totalDates = timeLineSeries.length;
      dateInterval = Math.floor(totalDates / 10);

      timeLineSeries.map((item, index) => {
        // index % dateInterval == 0 &&
        confirmedLabelArray.push(item.date);
        confirmedArray.push(item.totalconfirmed);

        deathsLabelArray.push(item.date);
        deathsArray.push(item.totaldeceased);

        recoveredLabelArray.push(item.date);
        recoveredArray.push(item.totalrecovered);
      });
    }
    const confirmedDataSet = {
      xAxisLabels: confirmedLabelArray,
      yAxisData: confirmedArray,
    };
    const deathsDataSet = {
      xAxisLabels: deathsLabelArray,
      yAxisData: deathsArray,
    };

    const recoveredDataSet = {
      xAxisLabels: recoveredLabelArray,
      yAxisData: recoveredArray,
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <CustomLineChart
            title={'Total Confirmed Cases'}
            dataSet={confirmedDataSet}
            onDataSelected={(x, y) => console.log(x, y)}
          />
          <CustomLineChart
            title={'Total Death Cases'}
            dataSet={deathsDataSet}
          />
          <CustomLineChart
            title={'Total Recovered Cases'}
            dataSet={recoveredDataSet}
          />
        </View>
      </ScrollView>
    );
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },

  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default WithLoadingSpinner()(TimelineSeries);
