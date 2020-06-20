import React, { useState } from 'react';
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
import { BackgroundColoredButton } from './BackgroundColoredButton';
import { useTheme } from '@react-navigation/native';
import { toCommas } from '../../utils/CommonUtils';

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
}

//TODO: Clear on change values total cases
//TODO: add per month etc

export const CustomLineChart = (props: Props) => {
  const { colors } = useTheme();

  const chartConfig = (primaryColor: string) => ({
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: () => `${primaryColor}`,
    // color: (opacity = 1) => `255, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 1,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '1',
      stroke: `${primaryColor}`,
    },
  });

  const [valueSelected, setValueSelected] = useState('');
  const [daySelected, setDaySelected] = useState('');
  const [isCumulative, setIsCumulative] = useState(props.cumulative);
  const [chartSpan, setChartSpan] = useState(TYPE.MONTH);
  const [chartCaseType, setChartCaseType] = useState(CASE_TYPE.TOTAL_CONFIRMED);

  const toggleCumulativeDataSwitch = () => {
    setIsCumulative((cumulative) => !cumulative);
    setDaySelected('');
  };

  const renderTabHeader = (caseType: CASE_TYPE) => {
    const tabHeaderStyle = [
      styles.tabHeaderStyle,
      { backgroundColor: colors.card },
    ];
    const highlightedTabStyle = {
      ...styles.tabHeaderStyle,
      backgroundColor: colors.card,
      borderBottomWidth: 2,
      borderColor: 'red',
    };
    const tabStyle =
      chartCaseType == caseType ? highlightedTabStyle : tabHeaderStyle;
    const tabName = _getNameForSelectedTab(caseType);

    return (
      <View style={tabStyle}>
        <TouchableOpacity
          onPress={() => {
            setChartCaseType(caseType);
          }}
        >
          <Text style={{ margin: 10, color: colors.text }}>{tabName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _showTabType = (caseType: CASE_TYPE) => {
    const { dataSet } = props;
    const { xAxisLabels = [], yAxisData = [] } = dataSet[caseType];

    const title = _getNameForSelectedTab(caseType);
    const color = _getColorForSelectedTab(caseType);

    const xAggregated = xAxisLabels;
    const yAggregated = getCumulativeArrayFor(yAxisData, isCumulative);

    const { filteredXArray, filteredYArray } = getDayFilteredValues(
      chartSpan,
      yAggregated,
      xAggregated
    );

    const hasData = filteredXArray.length > 0 || filteredXArray.length > 0;
    return (
      <Card
        style={{
          marginTop: '2%',
          marginBottom: '2%',
          backgroundColor: colors.card,
        }}
      >
        <Card.Title title={title} titleStyle={{ color: colors.text }} />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 1,
          }}
        >
          <Text style={{ padding: 10, color: colors.text }}>
            {'Individual'}
          </Text>
          <Switch
            value={isCumulative}
            onValueChange={toggleCumulativeDataSwitch}
          />
          <Text style={{ padding: 10, color: colors.text }}>
            {'Cumulative'}
          </Text>
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
              setDaySelected(filteredXArray[index]),
                setValueSelected(filteredYArray[index]);
            }}
            withVerticalLabels={false}
          />
        )}

        {!!daySelected && (
          <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
            <Text style={{ color: colors.text }}>{`${toCommas(
              valueSelected
            )} ${title} on ${daySelected}`}</Text>
          </View>
        )}
        {_renderDaySpanToggleButton()}
      </Card>
    );
  };

  const _renderDaySpanToggleButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <BackgroundColoredButton
          title={'Total'}
          selected={chartSpan === TYPE.ALL}
          onPress={() => {
            setChartSpan(TYPE.ALL);
            setDaySelected('');
          }}
        />
        <BackgroundColoredButton
          title={'Last 14 Days'}
          selected={chartSpan === TYPE.FORTNIGHT}
          onPress={() => {
            setChartSpan(TYPE.FORTNIGHT);
            setDaySelected('');
          }}
        />
        <BackgroundColoredButton
          title={'Last Month'}
          selected={chartSpan === TYPE.MONTH}
          onPress={() => {
            setChartSpan(TYPE.MONTH);
            setDaySelected('');
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {renderTabHeader(CASE_TYPE.TOTAL_CONFIRMED)}
        {renderTabHeader(CASE_TYPE.RECOVERED)}
        {renderTabHeader(CASE_TYPE.DEATH)}
      </View>
      <View>{_showTabType(chartCaseType)}</View>
    </View>
  );
};

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
