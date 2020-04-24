import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  InteractionManager,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
// import { Button } from 'react-native-paper';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import LoadingSpinner from './LoadingSpinner';

enum TYPE {
  WEEK = 0,
  MONTH = 1,
  ALL = 2,
}

interface Props {
  title: string;
  cumulative: boolean;
  color: string;
  dataSet: {
    xAxisLabels: Array<string>;
    yAxisData: Array<number>;
  };
}

//TODO: Clear on change values total cases
//TODO: add per month etc

export class CustomLineChart extends React.PureComponent<Props> {
  state = {
    valueSelected: '',
    daySelected: '',
    isCumulative: this.props.cumulative,
    chartSpan: TYPE.MONTH,
    didFinishAnimating: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishAnimating: true });
    });
  }

  toggleSwitch = () => {
    this.setState({ isCumulative: !this.state.isCumulative, daySelected: '' });
  };

  chartConfig = (primaryColor: string) => ({
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

  _renderToggleButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          onPress={() =>
            this.setState({ chartSpan: TYPE.ALL, daySelected: '' })
          }
        >
          Total
        </Button>
        <Button
          onPress={() =>
            this.setState({ chartSpan: TYPE.WEEK, daySelected: '' })
          }
        >
          Last 7 Days
        </Button>
        <Button
          onPress={() =>
            this.setState({ chartSpan: TYPE.MONTH, daySelected: '' })
          }
        >
          Last Month
        </Button>
      </View>
    );
  };

  // _renderChartView = (xAxisArray, yAxisArray) => {
  //   return()
  // }

  render() {
    const { dataSet, onDataSelected, title, color } = this.props;
    const { isCumulative, didFinishAnimating } = this.state;
    const { xAxisLabels = [], yAxisData = [] } = dataSet;

    const xAggregated = xAxisLabels;
    const yAggregated = getCumulativeArrayFor(yAxisData, isCumulative);

    const { filteredXArray, filteredYArray } = getDayFilteredValues(
      this.state.chartSpan,
      yAggregated,
      xAggregated
    );

    const showButtons = this._renderToggleButton();

    const hasData = filteredXArray.length > 0 || filteredXArray.length > 0;
    return didFinishAnimating ? (
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
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
            onValueChange={this.toggleSwitch}
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
            chartConfig={this.chartConfig(color)}
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
        {showButtons}
      </Card>
    ) : (
      <LoadingSpinner isVisible />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* ---- MOVE TO UTILITY */

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
    case TYPE.WEEK:
      filteredYArray = yAxisArray.slice(-7);
      filteredXArray = xAxisArray.slice(-7);
      break;
    case TYPE.MONTH:
      filteredYArray = yAxisArray;
      filteredXArray = xAxisArray;
  }
  return { filteredXArray, filteredYArray };
};
