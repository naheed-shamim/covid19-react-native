import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { CovidStats } from '../../common/components/CovidStats';
import { CustomButton } from '../../common/components/CustomButton';
import { WithTheme } from '../../common/hoc/WithTheme';
import { Screens } from '../../navigation/Constants';
import { getOverallStatsAndTimeline } from '../../redux/actions/CovidIndiaActions';
import { formatDate } from '../../utils/CommonUtils';

interface ComponentProps {
  getOverallStatsAndTimeline: () => void,
  totalCases: {
    lastupdatedtime: string, confirmed: string,
    deltaconfirmed: string,
    deaths: string,
    deltadeaths: string,
    recovered: string,
    deltarecovered: string
  },
  timeLineSeries: Array<any>,
  themeColors: Object,

}
class IndiaScreen extends React.Component<ComponentProps, {}> {
  componentDidMount() {
    this.props.getOverallStatsAndTimeline();
  }


  render() {
    const {
      totalCases: { lastupdatedtime = '' },
      themeColors,
    } = this.props;

    const {
      confirmed = '',
      deltaconfirmed = '',
      deaths = '',
      deltadeaths = '',
      recovered = '',
      deltarecovered = '',
    } = this.props.totalCases;

    const lastUpdatedTime = formatDate(lastupdatedtime);
    return (
      <ScrollView
        style={[
          styles.mainContainer,
          { backgroundColor: themeColors.background },
        ]}
      >
        <CovidStats
          headerTitle='INDIA Covid'
          headerColor={'tomato'}
          totalConfirmed={confirmed}
          newConfirmed={deltaconfirmed}
          totalDeaths={deaths}
          newDeaths={deltadeaths}
          totalRecovered={recovered}
          newRecovered={deltarecovered}
          lastUpdatedTime={lastUpdatedTime}
          onPress={() => this.props.navigation.navigate(Screens.STATE_DATA)}
        />
        <CustomButton title='Timeline Series' onPress={() => this.props.navigation.navigate(Screens.TIMELINE_STACK)} />

      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.covidIndia.loading,
    totalCases: state.covidIndia.totalCases,
    stateWise: state.covidIndia.statewise,
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    timeLineSeries: state.covidIndia.timeLineSeries,
    errorMsg: state.covidIndia.errorMsg,
  };
};
const mapDispatchToProps = {
  getOverallStatsAndTimeline,
};

const withThemedComponent = WithTheme(IndiaScreen);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withThemedComponent);

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  tableContainer: {
    padding: '1%',
  },
});
