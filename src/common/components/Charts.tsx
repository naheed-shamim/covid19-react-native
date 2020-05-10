import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import LoadingSpinner from './LoadingSpinner';
import { BackgroundColoredButton } from './BackgroundColoredButton';

enum TYPE {
  FORTNIGHT = 0,
  MONTH = 1,
  ALL = 2,
}

enum CASE_TYPE {
  TOTAL_CONFIRMED = 0,
  RECOVERED = 1,
  DEATH = 2,
}

interface Props {
  title: string;
  cumulative: boolean;
  color: string;
  dataSet: [];
  

//TODO: Clear on change values total cases
//TODO: add per month etc

export class CustomLineChart extends React.PureComponent<Props> {
  state = {
    valueSelected: '',
    daySelected: '',
    isCumulative: this.props.cumulative,
    chartSpan: TYPE.MONTH,
    caseType: CASE_TYPE.TOTAL_CONFIRMED,
    didFinishAnimating: true,
  };

  toggleCumulativeDataSwitch = () => {
    this.setState({ isCumulative: !this.state.isCumulative, daySelected: '' });
  };

  renderTabHeader = (caseType: CASE_TYPE) => {
    const tabHeaderStyle = styles.tabHeaderStyle;
    const highlightedTabStyle = {
      ...tabHeaderStyle,
      borderBottomWidth: 2,
      borderColor: 'red',
    };
    const tabStyle =
      this.state.caseType == caseType ? highlightedTabStyle : tabHeaderStyle;
    const tabName = _getNameForSelectedTab(caseType);

    return (
      <View style={tabStyle}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ caseType });
          }}
        >
          <Text style={{ margin: 10 }}>{tabName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _showTabType = (caseType: CASE_TYPE) => {
    const { dataSet, onDataSelected } = this.props;
    const { isCumulative, didFinishAnimating } = this.state;
    const { xAxisLabels = [], yAxisData = [] } = dataSet[this.state.caseType];

    const title = _getNameForSelectedTab(caseType);
    const color = _getColorForSelectedTab(caseType);

    const xAggregated = xAxisLabels;
    const yAggregated = getCumulativeArrayFor(yAxisData, isCumulative);

    const { filteredXArray, filteredYArray } = getDayFilteredValues(
      this.state.chartSpan,
      yAggregated,
      xAggregated
    );

    const hasData = filteredXArray.length > 0 || filteredXArray.length > 0;
    return (
      <Card style={{ marginTop: '2%', marginBottom: '2%' }}>
        <Card.Title title={title} />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 1,
          }}
        >
          <Text style={{ padding: 10 }}>{'Individual'}</Text>
          <Switch
            value={this.state.isCumulative}
            onValueChange={this.toggleCumulativeDataSwitch}
          />
          <Text style={{ padding: 10 }}>{'Cumulative'}</Text>
        </View>
        {hasData && (
          <LineChart
            data={{
              labels: filteredXArray,
              datasets: [
                {
                  data: filteredYArray,
                  strokeWidth: 1, // optional
                },
              ],
            }}
            width={Dimensions.get('window').width - 20} // from react-native
            height={200}
            yAxisInterval={1000} // optional, defaults to 1
            chartConfig={chartConfig(color)}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
            formatXLabel={(item) => item.substr(0, 6)}
            onDataPointClick={({ value, index, x, y }) => {
              this.setState({
                daySelected: filteredXArray[index],
                valueSelected: filteredYArray[index],
              });
            }}
            withVerticalLabels={false}
          />
        )}

        {!!this.state.daySelected && (
          <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
            <Text>{`${this.state.valueSelected} ${title} on ${this.state.daySelected}`}</Text>
          </View>
        )}
        {this._renderDaySpanToggleButton()}
      </Card>
    );
  };

  _renderTabs = () => {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {this.renderTabHeader(CASE_TYPE.TOTAL_CONFIRMED)}
          {this.renderTabHeader(CASE_TYPE.RECOVERED)}
          {this.renderTabHeader(CASE_TYPE.DEATH)}
        </View>
        <View>{this._showTabType(this.state.caseType)}</View>
      </View>
    );
  };

  _renderDaySpanToggleButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <BackgroundColoredButton
          title={'Total'}
          selected={this.state.chartSpan === TYPE.ALL}
          onPress={() =>
            this.setState({ chartSpan: TYPE.ALL, daySelected: '' })
          }
        />
        <BackgroundColoredButton
          title={'Last 14 Days'}
          selected={this.state.chartSpan === TYPE.FORTNIGHT}
          onPress={() =>
            this.setState({ chartSpan: TYPE.FORTNIGHT, daySelected: '' })
          }
        />
        <BackgroundColoredButton
          title={'Last Month'}
          selected={this.state.chartSpan === TYPE.MONTH}
          onPress={() =>
            this.setState({ chartSpan: TYPE.MONTH, daySelected: '' })
          }
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {this.renderTabHeader(CASE_TYPE.TOTAL_CONFIRMED)}
          {this.renderTabHeader(CASE_TYPE.RECOVERED)}
          {this.renderTabHeader(CASE_TYPE.DEATH)}
        </View>
        <View>{this._showTabType(this.state.caseType)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeaderStyle: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});

/*---------------------------------------- MOVE TO UTILITY ----------------------------------------*/

const getCumulativeArrayFor = (array, isCumulative: boolean) => {
  if (isCumulative) {
    const cumulativeArray = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => parseInt(a) + parseInt(b))
    );
    return cumulativeArray;
  } else return array;
};

const getDayFilteredValues = (chartSpan: number, yAxisArray, xAxisArray) => {
  let filteredYArray = yAxisArray;
  let filteredXArray = xAxisArray;
  switch (chartSpan) {
    case TYPE.MONTH:
      filteredYArray = yAxisArray.slice(-30);
      filteredXArray = xAxisArray.slice(-30);
      break;
    case TYPE.FORTNIGHT:
      filteredYArray = yAxisArray.slice(-14);
      filteredXArray = xAxisArray.slice(-14);
      break;
    case TYPE.MONTH:
      filteredYArray = yAxisArray;
      filteredXArray = xAxisArray;
  }
  return { filteredXArray, filteredYArray };
};

const _getNameForSelectedTab = (caseType: CASE_TYPE): String => {
  switch (caseType) {
    case CASE_TYPE.TOTAL_CONFIRMED:
      return 'Confirmed';
    case CASE_TYPE.RECOVERED:
      return 'Recovered';
    case CASE_TYPE.DEATH:
      return 'Deaths';
  }
};

const _getColorForSelectedTab = (caseType: CASE_TYPE): string => {
  switch (caseType) {
    case CASE_TYPE.TOTAL_CONFIRMED:
      return 'red';
    case CASE_TYPE.RECOVERED:
      return 'green';
    case CASE_TYPE.DEATH:
      return 'grey';
  }
};

const chartConfig = (primaryColor: string) => ({
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: () => `${primaryColor}`,
  // color: (opacity = 1) => `255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 1,
  },
  propsForDots: {
    r: '2',
    strokeWidth: '1',
    stroke: `${primaryColor}`,
  },
});
