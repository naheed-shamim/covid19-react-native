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
} from '../../redux/actions/CovidIndiaActions';
import { getWorldSummary } from '../../redux/actions/CovidWorldActions';
import { CovidStats } from '../../common/components/CovidStats';
import { Screens } from '../../navigation/Constants';
import { showLoader, ErrorLabel } from '../../common/components/CommonElements';
import { useTheme } from '@react-navigation/native';
import { WithTheme } from '../../common/hoc/WithTheme';

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
    const { worldErrorMsg, summary, themeColors } = this.props;

    if (worldErrorMsg) {
      return (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          <ErrorLabel
            message={worldErrorMsg}
            onPress={() => this._fetchDataFromAPI()}
          />
        </View>
      );
    } else if (summary) {
      const { Global, Date } = summary;
      const {
        TotalConfirmed = '',
        NewConfirmed = '',
        TotalDeaths = '',
        NewDeaths = '',
        TotalRecovered = '',
        NewRecovered = '',
      } = Global;

      return (
        <ScrollView
          style={[
            styles.mainContainer,
            { backgroundColor: themeColors.background },
          ]}
        >
          <CovidStats
            headerTitle='WORLD Covid'
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
    worldErrorMsg: state.covidWorld.error,
  };
};

const mapDispatchToProps = {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
  getWorldSummary,
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

const withTheme = WithTheme(HomeScreen);

export default connect(mapStateToProps, mapDispatchToProps)(withTheme);
