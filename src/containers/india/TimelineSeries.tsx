import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import WithLoadingSpinner from '../../common/hoc/WithLoadingSpinner';
import { CustomLineChart } from '../../common/components/Charts';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { getOverallStatsAndTimeline } from '../../redux/actions/CovidIndiaActions';
import BaseComponent from '../BaseComponent';
import { getWorldSummary } from '../../redux/actions/CovidWorldActions';

class TimelineSeries extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOverallStatsAndTimeline();
    this.props.getWorldSummary();
  }

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
            dataSet={[confirmedDataSet, recoveredDataSet, deathsDataSet]}
            // onDataSelected={(x, y) => console.log(x, y)
            // }
          />
        </View>
      </ScrollView>
    );
  };

  _renderLoader = (loading) => {
    return <LoadingSpinner isVisible={loading} />;
  };

  render() {
    const { loading, timeLineSeries = [], global } = this.props;
    !!global && console.log(global);

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
    global: state.covidWorld.global,
  };
};
const mapDispatchToProps = {
  getOverallStatsAndTimeline,
  getWorldSummary,
};
export default WithLoadingSpinner()(
  connect(mapStateToProps, mapDispatchToProps)(TimelineSeries)
);
