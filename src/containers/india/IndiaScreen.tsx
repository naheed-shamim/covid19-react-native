import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/CommonUtils';
import { CovidStats } from '../../common/components/CovidStats';
import { getOverallStatsAndTimeline } from '../../redux/actions/CovidIndiaActions';
import { CustomLineChart } from '../../common/components/Charts';

import { Screens } from '../../navigation/Constants';

class IndiaScreen extends React.Component {
  componentDidMount() {
    this.props.getOverallStatsAndTimeline();
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
        <Text style={{ fontSize: 26, fontWeight: 'bold', margin: '2%' }}>
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
    const {
      totalCases: { lastupdatedtime = '' },
      timeLineSeries = [],
    } = this.props;
    const {
      confirmed = '',
      deltaconfirmed = '',
      deaths = '',
      deltadeaths = '',
      recovered = '',
      deltarecovered = '',
    } = this.props.totalCases;

    const lastUpdatedTime = formatDate(lastupdatedtime);
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <CovidStats
            headerTitle='INDIA Covid'
            headerColor={'tomato'}
            totalConfirmed={confirmed}
            newConfirmed={deltaconfirmed}
            totalDeaths={deaths}
            newDeaths={deltadeaths}
            totalRecovered={recovered}
            newRecovered={deltarecovered}
            lastUpdatedTime={lastUpdatedTime}
            onPress={() => this.props.navigation.navigate(Screens.STATE_DATA)}
          />

          {this._renderTables(timeLineSeries)}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.covidIndia.loading,
    totalCases: state.covidIndia.totalCases,
    stateWise: state.covidIndia.statewise,
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    timeLineSeries: state.covidIndia.timeLineSeries,
    errorMsg: state.covidIndia.errorMsg,
  };
};
const mapDispatchToProps = {
  getOverallStatsAndTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndiaScreen);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'white' },
  tableContainer: {
    padding: '1%',
  },
});
