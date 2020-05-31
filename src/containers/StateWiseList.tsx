import React, { Component, PureComponent } from 'react';
import { FlatList, View, InteractionManager, Text } from 'react-native';
import { connect } from 'react-redux';
import { HorizontalRowItem } from '../common/components/HorizontalRowItem';
import LoadingSpinner from '../common/components/LoadingSpinner';
import BaseComponent from './BaseComponent';
import { getStateDistrictStats } from '../redux/actions/CovidIndiaActions';
import { Searchbar } from 'react-native-paper';
import { FlatListHeader } from '../common/components/CommonElements';
import { sortArrayBy } from '../utils/CommonUtils';

class StateWiseList extends BaseComponent {
  constructor(props: any) {
    super(props);
  }
  state = {
    didFinishAnimating: false,
    isAscending: false,
    stateList: this.props.statewise,
    selectedComparator: 'title',
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishAnimating: true });
    });
  }

  _handleSort = (comparatorField: string) => {
    let sortedCountryList = this.state.stateList;

    let ascendingSort = this.state.isAscending;
    if (this.state.selectedComparator == comparatorField) {
      ascendingSort = !ascendingSort;
    }

    switch (comparatorField) {
      case 'title':
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'state',
          !ascendingSort
        );
        break;
      case 'confirmed':
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'confirmed',
          ascendingSort
        );
        break;
      case 'deaths':
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'deaths',
          ascendingSort
        );
        break;
      case 'recovered':
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'recovered',
          ascendingSort
        );
        break;
      default:
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'state',
          ascendingSort
        );
    }
    this.setState({
      stateList: sortedCountryList,
      selectedComparator: comparatorField,
      isAscending: ascendingSort,
    });
  };

  _renderFlatList = () => {
    const { statewise = [], stateDistrictWiseData = {} } = this.props;
    const { stateList = [] } = this.state;
    // console.log(statewise);
    const showHeaders = (
      <FlatListHeader
        title={'State'}
        onPress={(comparator: string) => this._handleSort(comparator)}
      />
    );
    return (
      <View style={{ flex: 1 }}>
        {/* {showHeaders} */}
        <FlatList
          ListHeaderComponent={showHeaders}
          data={stateList}
          renderItem={({ item, index }) => (
            // <CollapsibleRowItem
            //   overallStateData={item}
            //   districtDetails={stateDistrictWiseData[item.state]}
            // />
            <HorizontalRowItem overallData={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: '3%',
          margin: '1%',
          paddingLeft: 20,
          padding: 3,
        }}
      >
        <Text style={{ flex: 2 }}>{'State'}</Text>
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
          }}
        >
          {'Confirmed'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
          }}
        >
          {'Recovered'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            flex: 1,
          }}
        >
          {'Deaths'}
        </Text>
      </View>
    );
  };

  _renderBlankView = () => {
    return <LoadingSpinner isVisible={true} />;
  };

  render() {
    const showStateData = this.state.didFinishAnimating
      ? this._renderFlatList()
      : this._renderBlankView();

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>{showStateData}</View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    statewise: state.covidIndia.statewise,
  };
};

const mapDispatchToProps = {
  getStateDistrictStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(StateWiseList);
