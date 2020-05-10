import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { AntDesign } from '@expo/vector-icons';
import { toCommas, getPercentage } from '../utils/CommonUtils';
import { strings } from '../constants/Strings';
import { Theme } from '../common/VisualTheme';

import TimeAgo from 'react-native-timeago';

import {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
} from '../redux/actions/CovidIndiaActions';
import { getWorldSummary } from '../redux/actions/CovidWorldActions';
import { getTotalIndiaCasesArray } from '../utils/AppUtils';
import { SquareColoredRowItem } from '../common/components/SquareColoredRowItem';
import {
  MemoizedLastUpdatedTime,
  MemoizedTotalAndNewCases,
} from '../common/components/CommonElements';

interface Props {
  totalCases: {};
  global: {};
}
class HomeScreen extends Component<Props> {
  componentDidMount() {
    this._fetchDataFromAPI();
  }

  _fetchDataFromAPI = async () => {
    this.props.getStateDistrictStats();
    this.props.getOverallStatsAndTimeline();
    this.props.getWorldSummary();
  };

  _getPercentageStats = () => {
    const { global = {} } = this.props;

    const { TotalConfirmed, TotalDeaths, TotalRecovered } = global;
    const deathPercentage = getPercentage(TotalDeaths, TotalConfirmed);
    const recoveryPercentage = getPercentage(TotalRecovered, TotalConfirmed);

    return {
      deathPercentage,
      recoveryPercentage,
    };
  };

  _renderGlobalStatsCards = () => {
    const {
      TotalConfirmed = '',
      NewConfirmed = '',
      TotalDeaths = '',
      NewDeaths = '',
      TotalRecovered = '',
      NewRecovered = '',
    } = this.props.global;
    const { deathPercentage, recoveryPercentage } = this._getPercentageStats();
    return (
      <View>
        <Card elevation={3} style={styles.horizontalCardStyle}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <Text style={styles.statsLabelStyle}>{'Total Confirmed'}</Text>
            <MemoizedTotalAndNewCases
              totalCases={TotalConfirmed}
              newCases={NewConfirmed}
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
              <MemoizedTotalAndNewCases
                totalCases={TotalDeaths}
                newCases={NewDeaths}
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
              <MemoizedTotalAndNewCases
                totalCases={TotalRecovered}
                newCases={NewRecovered}
                color='green'
              />
            </View>
          </Card>
        </View>
      </View>
    );
  };

  render() {
    const { globalLastUpdateTime } = this.props;
    console.log(globalLastUpdateTime);

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.dummyHeader}>
            <Text style={styles.titleText}>{'World Covid Data'}</Text>
          </View>
          <View style={styles.statsContainer}>
            {this._renderGlobalStatsCards()}
            <MemoizedLastUpdatedTime lastUpdatedTime={globalLastUpdateTime} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    totalCases: state.covidIndia.totalCases,
    stateWise: state.covidIndia.statewise,
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    global: state.covidWorld.global,
    globalLastUpdateTime: state.covidWorld.globalLastUpdateTime,
  };
};

const mapDispatchToProps = {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
  getWorldSummary,
};

const blueHeaderHeight = 55;
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'white' },
  dummyHeader: {
    aspectRatio: 3,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
  statsContainer: {
    width: '100%',
    height: `${blueHeaderHeight}%`,
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
  statsValueStyle: { fontSize: 25, fontWeight: '600' },
  statsLabelStyle: { fontSize: 15 },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
