import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { CovidService } from '../service/CovidService';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { SquareColoredRowItem } from './SquareColoredRowItem';
import { CustomProgressCircle } from '../common/components/CustomProgressCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme } from '../common/VisualTheme';

const WINDOW_WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  state = {
    genericData: {},
    stateData: [],
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
    this.setState({ genericData: generalStats });
    this.setState({ stateData: stateData });
  };

  _generateGenericData = (covidData: Array): Array<Object> => {
    if (covidData == null || covidData.length == 0) return [];
    else {
      const { active, confirmed, deaths, recovered } = covidData;

      return [
        { label: 'Confirmed', value: confirmed, color: 'red' },
        { label: 'Active', value: active, color: 'blue' },
        { label: 'Recovered', value: recovered, color: 'green' },
        { label: 'Deaths', value: deaths, color: 'grey' },
      ];
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

  render() {
    const flatListData = this._generateGenericData(this.state.genericData);

    const {
      deathPercentage = 0,
      recoveryPercentage,
    } = this._getPercentageStats();

    // const stateWiseData =
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
          {'COVID-19 Tracker'}
        </Text> */}

        <View>
          <FlatList
            data={flatListData}
            renderItem={({ item, index }) => (
              <SquareColoredRowItem
                label={item.label}
                value={item.value}
                color={item.color}
              />
            )}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
            backgroundColor: Theme.PRIMARY_ACCENT,
            borderRadius: 3,
            // flex: 1,
          }}
          onPress={() =>
            this.props.navigation.navigate('StateData', {
              stateData: this.state.stateData,
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
      </View>
    );
  }
}

export default WithLoadingSpinner()(HomeScreen);
