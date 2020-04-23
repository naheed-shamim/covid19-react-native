import React from 'react';
import { View, Text, StyleSheet, Dimensions, Switch } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

interface Props {
  title: string;
  cumulative: boolean;
  color: string;
  dataSet: {
    xAxisLabels: Array<string>;
    yAxisData: Array<number>;
  };
}

const getCumulativeArrayFor = (array) => {
  // let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let cumulativeArray = array.map((elem, index) =>
    array.slice(0, index + 1).reduce((a, b) => parseInt(a) + parseInt(b))
  );
  return cumulativeArray;
};

export class CustomLineChart extends React.PureComponent<Props> {
  state = {
    valueSelected: '',
    daySelected: '',
    isCumulative: this.props.cumulative,
  };

  toggleSwitch = () => {
    this.setState({ isCumulative: !this.state.isCumulative });
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

  render() {
    let yAxisValues: Array<number> = [];
    const { dataSet, onDataSelected, title, color } = this.props;
    const { xAxisLabels = [], yAxisData = [] } = dataSet;

    yAxisValues = yAxisData;
    if (this.state.isCumulative) {
      yAxisValues = getCumulativeArrayFor(yAxisData);
    }
    //TODO: Clear on change values total cases

    const hasData = xAxisLabels.length > 0 || yAxisData.length > 0;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
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
              labels: xAxisLabels,
              datasets: [
                {
                  data: yAxisValues,
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
              //   onDataSelected(xAxisLabels[index], yAxisData[index]),
              this.setState({
                daySelected: xAxisLabels[index],
                valueSelected: yAxisValues[index],
              });
            }}
            withVerticalLabels={false}
          />
        )}
        {this.state.daySelected.length > 0 && (
          <View style={{ alignSelf: 'center' }}>
            <Text>{`${this.state.valueSelected} ${title} on ${this.state.daySelected}`}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
