import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OverallData } from '../common/components/OverallData';
import { formatDateAbsolute, formatDate } from '../utils/CommonUtils';
import { strings } from '../constants/Strings';
import { Theme } from '../common/VisualTheme';
import BaseComponent from './BaseComponent';

class HomeScreen extends BaseComponent {
  state = {
    totalCases: {},
    stateWiseData: [],
    stateDistrictWiseData: {},
  };
  componentDidMount() {
    // const { navigation } = this.props;
    // navigation.setOptions({
    //   headerRight: () => <Button title='Save' />,
    // });
    this._fetchDataFromAPI();
  }

  _fetchDataFromAPI = async () => {
    const { statewise } = await CovidService.getGenericStats(
      this.props.withLoader
    );
    const stateDistrictWiseData = await CovidService.getStateDistrictStats(
      this.props.withLoader
    );

    const totalCases = statewise[0]; //1st array elements is total Cases
    const stateWiseData = statewise.slice(1); //Rest array elements contain state-wise Data

    this.setState({
      totalCases: totalCases,
      stateWiseData,
      stateDistrictWiseData,
    });
  };

  _getPercentageStats = () => {
    const { totalCases } = this.state;
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
    const { lastupdatedtime } = this.state.totalCases;
    let lastUpdatedTime = '';
    if (lastupdatedtime) {
      lastUpdatedTime = isNaN(Date.parse(formatDate(lastupdatedtime)))
        ? ''
        : formatDateAbsolute(lastupdatedtime);
    }
    return lastUpdatedTime;
  };

  render() {
    const {
      totalCases = { active: 0, confirmed: 0, deaths: 0, recovered: 0 },
    } = this.state;
    const lastUpdatedTime = this._getLastUpdatedTime();

    const {
      deathPercentage = 0,
      recoveryPercentage,
    } = this._getPercentageStats();

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {/* Render the Generic Data */}
          <View style={{ borderWidth: 1, borderColor: 'grey', margin: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <OverallData
                label='Active'
                value={totalCases.active}
                textColor='red'
              />
              <OverallData
                label='Deaths'
                value={totalCases.deaths}
                textColor='grey'
              />
              <OverallData
                label='Recovered'
                value={totalCases.recovered}
                textColor='green'
              />
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Text>{`Total Confirmed cases: ${totalCases.confirmed}`}</Text>
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
            onPress={() =>
              this.props.navigation.navigate('StateData', {
                stateWiseData: this.state.stateWiseData,
                stateDistrictWiseData: this.state.stateDistrictWiseData,
              })
            }
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

const styles = StyleSheet.create({});

export default WithLoadingSpinner()(HomeScreen);
