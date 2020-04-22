import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedOverallData } from '../common/components/OverallData';
import { formatDateAbsolute, formatDate } from '../utils/CommonUtils';
import { strings } from '../constants/Strings';
import { Theme } from '../common/VisualTheme';
import BaseComponent from './BaseComponent';
import {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
} from '../redux/actions/CovidIndiaActions';

interface Props {
  totalCases: {};
}
class HomeScreen extends BaseComponent {
  // props: any;
  componentDidMount() {
    this._fetchDataFromAPI();
  }

  _fetchDataFromAPI = async () => {
    this.props.getStateDistrictStats();
    this.props.getOverallStatsAndTimeline();
  };

  _getPercentageStats = () => {
    const { totalCases = {} } = this.props;
    if (totalCases) {
      const { confirmed, deaths, recovered } = totalCases;
      const confirmedValue = parseInt(confirmed);
      const deathsValue = parseFloat(deaths);
      const recoveredValue = parseFloat(recovered);
      let deathPercentage = (deathsValue / confirmedValue) * 100;
      let recoveryPercentage = (recoveredValue / confirmedValue) * 100;

      return { deathPercentage, recoveryPercentage };
    } else return { deathPercentage: 0, recoveryPercentage: 0 };
  };

  _getLastUpdatedTime = () => {
    const { totalCases = {} } = this.props;
    const { lastupdatedtime = '' } = totalCases;
    let lastUpdatedTime = '';

    if (!!lastupdatedtime) {
      lastUpdatedTime = isNaN(Date.parse(formatDate(lastupdatedtime)))
        ? ''
        : formatDateAbsolute(lastupdatedtime);
    }
    return lastUpdatedTime;
  };

  render() {
    const { totalCases = {} } = this.props;
    const { active = 0, confirmed = 0, deaths = 0, recovered = 0 } = totalCases;
    const lastUpdatedTime = this._getLastUpdatedTime();

    const { deathPercentage, recoveryPercentage } = this._getPercentageStats();

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {/* Render the Generic Data */}
          <View style={{ borderWidth: 1, borderColor: 'grey', margin: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <ThemedOverallData
                label='Active'
                value={active}
                textColor='red'
              />
              <ThemedOverallData
                label='Deaths'
                value={deaths}
                textColor='grey'
              />
              <ThemedOverallData
                label='Recovered'
                value={recovered}
                textColor='green'
              />
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Text>{`Total Confirmed cases: ${confirmed}`}</Text>
              <Text>{`Last updated time: ${lastUpdatedTime}`}</Text>
              <TouchableOpacity onPress={() => this._fetchDataFromAPI()}>
                <Text>{strings.refreshData}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
          <View
            style={{
              margin: 20,
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}
          >
            <CustomProgressCircle
              percent={recoveryPercentage}
              descriptionLabel='Recovery Rates'
              color={'green'}
            />
            <CustomProgressCircle
              percent={deathPercentage}
              descriptionLabel='Death Rates'
              color={'red'}
            />
          </View>
          <TouchableOpacity
            style={{
              margin: 5,
              padding: 5,
              backgroundColor: 'white',
              borderRadius: 3,
              borderWidth: 2,
              borderColor: Theme.PRIMARY_ACCENT,
            }}
            onPress={() => this.props.navigation.navigate('StateData')}
          >
            <Text
              style={{
                alignSelf: 'center',
                color: Theme.PRIMARY_ACCENT,
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
              }}
            >
              {'Check State Data'}
            </Text>
          </TouchableOpacity>
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
  };
};

const mapDispatchToProps = {
  getOverallStatsAndTimeline,
  getStateDistrictStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({});
