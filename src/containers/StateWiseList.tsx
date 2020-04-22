import React, { Component, PureComponent } from 'react';
import { FlatList, View, InteractionManager, Text } from 'react-native';
import { connect } from 'react-redux';
import { HorizontalRowItem } from '../common/components/HorizontalRowItem';
import LoadingSpinner from '../common/components/LoadingSpinner';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CollapsibleRowItem } from '../common/components/CollapsibleRowItem';
import { CovidService } from '../service/CovidService';
import BaseComponent from './BaseComponent';
import { getStateDistrictStats } from '../redux/actions/CovidIndiaActions';

class StateWiseList extends BaseComponent {
  constructor(props: any) {
    super(props);
  }
  state = { didFinishAnimating: false };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishAnimating: true });
    });
  }

  _renderFlatList = () => {
    const { statewise = [], stateDistrictWiseData = {} } = this.props;
    const showHeaders = this._renderHeader();
    return (
      <View style={{ flex: 1 }}>
        {showHeaders}
        <FlatList
          data={statewise}
          renderItem={({ item, index }) => (
            <CollapsibleRowItem
              overallStateData={item}
              districtDetails={stateDistrictWiseData[item.state]}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row', margin: 5, padding: 5 }}>
        <Text style={{ flex: 2 }}>{'State'}</Text>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            flex: 1,
          }}
        >
          {'Active'}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            flex: 1,
          }}
        >
          {'Recovered'}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
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
    const showHeaders = this._renderHeader();

    const showStateData = this.state.didFinishAnimating
      ? this._renderFlatList()
      : this._renderBlankView();

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* {showHeaders} */}
        {showStateData}
      </View>
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

// export default connect(mapStateToProps, mapDispatchToProps)(StateWiseList);
export default connect(mapStateToProps, mapDispatchToProps)(StateWiseList);
