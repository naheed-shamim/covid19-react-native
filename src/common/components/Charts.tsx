import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
  dataSet: {
    xAxisLabels: Array<string>;
    yAxisData: Array<number>;
  };
}
const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 1,
  },
  propsForDots: {
    r: '1',
    strokeWidth: '1',
    stroke: '#000',
  },
};

export class CustomLineChart extends React.PureComponent<Props> {
  state = { valueSelected: '', daySelected: '' };

  render() {
    const { dataSet, onDataSelected, title } = this.props;
    const { xAxisLabels = [], yAxisData = [] } = dataSet;

    const hasData = xAxisLabels.length > 0 || yAxisData.length > 0;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        {hasData && (
          <LineChart
            data={{
              labels: xAxisLabels,
              datasets: [
                {
                  data: yAxisData,
                  strokeWidth: 1, // optional
                },
              ],
            }}
            width={Dimensions.get('window').width - 20} // from react-native
            height={200}
            yAxisInterval={1000} // optional, defaults to 1
            chartConfig={chartConfig}
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
                valueSelected: yAxisData[index],
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
