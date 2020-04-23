import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { strings } from '../constants/Strings';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CustomLineChart } from '../common/components/Charts';
import LoadingSpinner from '../common/components/LoadingSpinner';
import { getOverallStatsAndTimeline } from '../redux/actions/CovidIndiaActions';
import BaseComponent from './BaseComponent';

class TimelineSeries extends BaseComponent {
  constructor(props) {
    super(props);
  }
  // state = { timeLineSeries: [] };

  componentDidMount() {
    // this._fetchTimeLine();
    this.props.getOverallStatsAndTimeline();
  }

  _fetchTimeLine = async () => {
    const { cases_time_series } = await CovidService.getGenericStats(
      this.props.withLoader
    );
    this.setState({ timeLineSeries: cases_time_series });
  };

  _renderTables = (timeLineSeries) => {
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
        confirmedArray.push(item.dailyconfirmed);

        deathsLabelArray.push(item.date);
        deathsArray.push(item.dailydeceased);

        recoveredLabelArray.push(item.date);
        recoveredArray.push(item.dailyrecovered);
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
            cumulative={false}
            color={'red'}
            title={'Total Confirmed Cases'}
            dataSet={confirmedDataSet}
            // onDataSelected={(x, y) => console.log(x, y)
            // }
          />
          <CustomLineChart
            cumulative={false}
            color={'grey'}
            title={'Total Death Cases'}
            dataSet={deathsDataSet}
          />
          <CustomLineChart
            cumulative={false}
            color={'green'}
            title={'Total Recovered Cases'}
            dataSet={recoveredDataSet}
          />
        </View>
      </ScrollView>
    );
  };

  _renderLoader = (loading) => {
    return <LoadingSpinner isVisible={loading} />;
  };

  render() {
    const { loading, timeLineSeries = [] } = this.props;

    const renderView = loading
      ? this._renderLoader(loading)
      : this._renderTables(timeLineSeries);

    return <View style={{ flex: 1 }}>{renderView}</View>;
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

const mapStateToProps = (state: any) => {
  return {
    loading: state.covidIndia.loading,
    timeLineSeries: state.covidIndia.timeLineSeries,
  };
};
const mapDispatchToProps = {
  getOverallStatsAndTimeline,
};
export default WithLoadingSpinner()(
  connect(mapStateToProps, mapDispatchToProps)(TimelineSeries)
);
