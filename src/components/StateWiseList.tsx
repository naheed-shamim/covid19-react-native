import React, { Component, PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { HorizontalRowItem } from './HorizontalRowItem';

export default class StateWiseList extends Component {
  constructor(props) {
    super(props);
    this.stateWiseData = [];
  }
  componentDidMount() {
    this.stateWiseData = this.props.route.params.stateData;
  }

  render() {
    // const { stateWiseData } = this.props;
    const { stateData } = this.props.route.params;

    // const stateWiseData = [];
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={stateData}
          renderItem={({ item, index }) => (
            <HorizontalRowItem
              active={item.active}
              deaths={item.deaths}
              recovered={item.recovered}
              confirmed={item.confirmed}
              state={item.state}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
