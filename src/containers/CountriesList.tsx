import React, { Component, PureComponent } from 'react';
import { FlatList, View, InteractionManager, Text } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import LoadingSpinner from '../common/components/LoadingSpinner';

import { Searchbar } from 'react-native-paper';

class CountriesList extends Component {
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
    const { countries = [] } = this.props;
    const showHeaders = this._renderHeader();
    return (
      <View style={{ flex: 1 }}>
        {showHeaders}
        <FlatList
          data={countries}
          renderItem={({ item, index }) => <List.Item title={item.Country} />}
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>{showStateData}</View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    countries: state.covidWorld.countries,
  };
};

export default connect(mapStateToProps, null)(CountriesList);
