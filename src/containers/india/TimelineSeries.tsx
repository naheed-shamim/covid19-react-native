import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CustomLineChart } from '../../common/components/Charts';
import { WithTheme } from '../../common/hoc/WithTheme';
import { getOverallStatsAndTimeline } from '../../redux/actions/CovidIndiaActions';
import BaseComponent from '../BaseComponent';


class TimelineSeries extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOverallStatsAndTimeline();

  }

  _renderTables = (timeLineSeries) => {
    const { themeColors } = this.props;
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
      <View style={styles.tableContainer}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            margin: '2%',
            color: themeColors.text,
          }}
        >
          {'India Timeline'}
        </Text>
        <CustomLineChart
          cumulative={false}
          color={'red'}
          title={'Total Confirmed Cases'}
          dataSet={[confirmedDataSet, recoveredDataSet, deathsDataSet]}
        />
      </View>
    );
  };

  render() {
    const { timeLineSeries = [], } = this.props;


    const renderView = this._renderTables(timeLineSeries);

    return <ScrollView style={{ flex: 1 }}>{renderView}</ScrollView>;
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
  tableContainer: {
    padding: '1%',
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

const withThemedComponent = WithTheme(TimelineSeries);

export default connect(mapStateToProps, mapDispatchToProps)(withThemedComponent);

