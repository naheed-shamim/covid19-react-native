import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
} from '../redux/actions/CovidIndiaActions';
import { getWorldSummary } from '../redux/actions/CovidWorldActions';
import { CovidStats } from '../common/components/CovidStats';
import { Screens } from '../navigation/Constants';
import LoadingSpinner, {
  showLoader,
} from '../common/components/LoadingSpinner';

interface Props {
  totalCases: {};
  summary: {};
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

  _renderMainView = () => {
    if (this.props.summary) {
      const { Global, Date } = this.props.summary;
      const {
        TotalConfirmed = '',
        NewConfirmed = '',
        TotalDeaths = '',
        NewDeaths = '',
        TotalRecovered = '',
        NewRecovered = '',
      } = Global;

      return (
        <ScrollView style={styles.mainContainer}>
          <CovidStats
            headerTitle='world Covid'
            headerColor={'blue'}
            totalConfirmed={TotalConfirmed}
            newConfirmed={NewConfirmed}
            totalDeaths={TotalDeaths}
            newDeaths={NewDeaths}
            totalRecovered={TotalRecovered}
            newRecovered={NewRecovered}
            lastUpdatedTime={Date}
            onPress={() => this.props.navigation.navigate(Screens.COUNTRY_DATA)}
          />
        </ScrollView>
      );
    } else return null;
  };

  render() {
    const { loading } = this.props;

    console.log(loading);

    return loading ? showLoader(loading) : this._renderMainView();
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.app.loading,
    totalCases: state.covidIndia.totalCases,
    stateWise: state.covidIndia.statewise,
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    summary: state.covidWorld.summary,
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
