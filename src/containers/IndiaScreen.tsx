import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import { toCommas, getPercentage, formatDate } from '../utils/CommonUtils';
import { Card, Divider } from 'react-native-paper';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { getOverallStatsAndTimeline } from '../redux/actions/CovidIndiaActions';
import { CustomLineChart } from '../common/components/Charts';

import { Screens } from '../navigation/Constants';
import {
  MemoizedLastUpdatedTime,
  MemoizedTotalAndNewCases as NewAndTotalCases,
} from '../common/components/CommonElements';

class IndiaScreen extends React.Component {
  componentDidMount() {
    this.props.getOverallStatsAndTimeline();
  }
  _getPercentageStats = () => {
    const {
      confirmed = '',
      deaths = '',
      recovered = '',
    } = this.props.totalCases;

    const deathPercentage = getPercentage(deaths, confirmed);
    const recoveryPercentage = getPercentage(recovered, confirmed);
    return { deathPercentage, recoveryPercentage };
  };
  _renderIndiaStatsCards = () => {
    const {
      confirmed = '',
      deltaconfirmed = '',
      deaths = '',
      deltadeaths = '',
      recovered = '',
      deltarecovered = '',
    } = this.props.totalCases;

    const { deathPercentage, recoveryPercentage } = this._getPercentageStats();

    return (
      <View>
        <Card elevation={3} style={styles.horizontalCardStyle}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => this.props.navigation.navigate(Screens.STATE_DATA)}
          >
            <Text style={styles.statsLabelStyle}>{'Total Confirmed'}</Text>
            <NewAndTotalCases
              totalCases={confirmed}
              newCases={deltaconfirmed}
              color='red'
            />
            <AntDesign name='right' size={10} color='black' />
          </TouchableOpacity>
        </Card>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Card elevation={3} style={styles.squareCardStyle}>
            <View style={styles.squareCardContainerStyle}>
              <Text style={[styles.statsLabelStyle]}>{'Total Deaths'}</Text>
              <CustomProgressCircle percent={deathPercentage} color={'red'} />
              <NewAndTotalCases
                totalCases={deaths}
                newCases={deltadeaths}
                color='grey'
              />
            </View>
          </Card>
          <Card elevation={3} style={styles.squareCardStyle}>
            <View style={styles.squareCardContainerStyle}>
              <Text style={styles.statsLabelStyle}>{'Total Recovered'}</Text>
              <CustomProgressCircle
                percent={recoveryPercentage}
                color={'green'}
              />
              <NewAndTotalCases
                totalCases={recovered}
                newCases={deltarecovered}
                color='green'
              />
            </View>
          </Card>
        </View>
      </View>
    );
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
    console.log(this.props.totalCases);
    const lastUpdatedTime = formatDate(lastupdatedtime);
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.dummyHeader}>
          <Text style={styles.titleText}>{'India Covid Data'}</Text>
        </View>
        <View style={styles.statsContainer}>
          {this._renderIndiaStatsCards()}
          <MemoizedLastUpdatedTime lastUpdatedTime={lastUpdatedTime} />
        </View>
        <Divider style={{ margin: '5%' }} />

        {this._renderTables(timeLineSeries)}
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
  };
};
const mapDispatchToProps = {
  getOverallStatsAndTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndiaScreen);

const blueHeaderHeight = 55;
const styles = StyleSheet.create({
  mainContainer: { height: '100%', backgroundColor: 'white' },
  dummyHeader: {
    aspectRatio: 3,
    backgroundColor: 'tomato',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
  statsContainer: {
    marginTop: '-15%',
  },
  horizontalCardStyle: {
    margin: '5%',
    padding: '5%',
  },
  squareCardStyle: {
    flex: 1,
    margin: '2%',
    padding: '2%',
    justifyContent: 'center',
  },
  squareCardContainerStyle: { alignItems: 'center', padding: '10%' },
  // statsValueStyle: { fontSize: 25, fontWeight: '600' },
  statsLabelStyle: { fontSize: 15 },
  tableContainer: {
    padding: '1%',
  },
});
