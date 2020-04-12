import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { SquareColoredRowItem } from '../common/components/SquareColoredRowItem';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../common/VisualTheme';
import { OverallData } from '../common/components/OverallData';
import { formatDateAbsolute, formatDate } from '../utils/CommonUtils';

class HomeScreen extends Component {
  state = {
    genericData: {},
    stateData: [],
    districtData: {},
  };
  componentDidMount() {
    this._fetchGenericData();
  }
  _fetchGenericData = async () => {
    const { statewise } = await CovidService.getGenericStats(
      this.props.withLoader
    );
    const generalStats = statewise[0];
    const stateData = statewise.slice(1);
    const districtData = await CovidService.getStateDistrictStats(
      this.props.withLoader
    );
    this.setState({ genericData: generalStats, stateData, districtData });
  };

  _generateGenericData = (covidData: Array<Object>): Array<Object> => {
    if (covidData == null || covidData.length == 0) return [];
    else {
      return covidData;
    }
  };

  _getPercentageStats = () => {
    const { genericData } = this.state;
    if (genericData) {
      const { confirmed, deaths, recovered } = genericData;
      const confirmedValue = parseInt(confirmed);
      const deathsValue = parseFloat(deaths);
      const recoveredValue = parseFloat(recovered);
      let deathPercentage = (deathsValue / confirmedValue) * 100;
      let recoveryPercentage = (recoveredValue / confirmedValue) * 100;

      return { deathPercentage, recoveryPercentage };
    } else return { deathPercentage: 0, recoveryPercentage: 0 };
  };

  _getLastUpdatedTime = () => {
    let lastUpdatedTime = '';
    if (this.state.genericData.lastupdatedtime) {
      lastUpdatedTime = isNaN(
        Date.parse(formatDate(this.state.genericData.lastupdatedtime))
      )
        ? ''
        : formatDateAbsolute(this.state.genericData.lastupdatedtime);
    }
    return lastUpdatedTime;
  };

  render() {
    const totalCases = this._generateGenericData(this.state.genericData);
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
              backgroundColor: 'tomato',
              borderRadius: 3,
              // flex: 1,π
            }}
            onPress={() =>
              this.props.navigation.navigate('StateData', {
                stateData: this.state.stateData,
                districtData: this.state.districtData,
              })
            }
          >
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
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
