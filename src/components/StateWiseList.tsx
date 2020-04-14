import React, { Component, PureComponent } from 'react';
import { FlatList, View, InteractionManager, Text } from 'react-native';
import { HorizontalRowItem } from '../common/components/HorizontalRowItem';
import LoadingSpinner from '../common/components/LoadingSpinner';
import WithLoadingSpinner from '../common/hoc/WithLoadingSpinner';
import { CollapsibleRowItem } from '../common/components/CollapsibleRowItem';
import { CovidService } from '../service/CovidService';

// const StateDistrictData = (generic, district = {}) => {
//   return { generic, district };
// };
class StateWiseList extends Component {
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
    const {
      stateWiseData = [],
      stateDistrictWiseData = {},
    } = this.props.route.params;
    const showHeaders = this._renderHeader();
    return (
      <View style={{ flex: 1 }}>
        {showHeaders}
        <FlatList
          data={stateWiseData}
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
    // const { stateWiseData } = this.props;
    const showHeaders = this._renderHeader();

    const showStateData = this.state.didFinishAnimating
      ? this._renderFlatList()
      : this._renderBlankView();

    // const stateWiseData = [];
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* {showHeaders} */}
        {showStateData}
      </View>
    );
  }
}

export default WithLoadingSpinner()(StateWiseList);
