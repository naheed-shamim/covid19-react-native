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
  stateWiseData: never[];
  stateDistrictData: {};
  constructor(props: any) {
    super(props);
    // this.stateWiseData = [];
    // this.stateDistrictData = {};
  }
  state = { didFinishAnimating: false };

  componentDidMount() {
    // this._fetchStateDistrictData();
    InteractionManager.runAfterInteractions(() => {
      // this.stateWiseData = this.props.route.params.stateData;
      // this.stateDistrictData = this.props.route.params.districtData;

      this.setState({ didFinishAnimating: true });
    });
  }

  // _manipulateData = () => {
  //   let detailedStateData = [];
  //   this.stateWiseData.map((item) => {
  //     const detail = this.stateDistrictData[item.state];
  //     const newData = { generic: item, detailed: detail.districtData };
  //     detailedStateData.push(newData);
  //   });
  //   console.log(detailedStateData);
  // };

  // _fetchStateDistrictData = async () => {
  //   this.stateDistrictData = await CovidService.getStateDistrictStats(
  //     this.props.withLoader
  //   );
  //   this._manipulateData();
  // };

  _renderFlatList = () => {
    const { stateData, districtData } = this.props.route.params;
    const showHeaders = this._renderHeader();
    return (
      <View style={{ flex: 1 }}>
        {showHeaders}
        <FlatList
          data={stateData}
          renderItem={({ item, index }) => (
            <CollapsibleRowItem
              overallStateData={item}
              districtDetails={districtData[item.state]}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Text style={{ flex: 2 }}>{'State'}</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{'Active'}</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{'Recovered'}</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{'Deaths'}</Text>
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
