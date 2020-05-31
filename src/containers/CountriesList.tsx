import React, { Component, PureComponent } from 'react';
import { FlatList, View, InteractionManager, Text } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import LoadingSpinner from '../common/components/LoadingSpinner';

import { Searchbar } from 'react-native-paper';
import { FlatListHeader } from '../common/components/CommonElements';
import { HorizontalRowItem } from '../common/components/HorizontalRowItem';
import { Screens } from '../navigation/Constants';
import { sortArrayBy } from '../utils/CommonUtils';

class CountriesList extends React.PureComponent {
  constructor(props: any) {
    super(props);
  }
  state = {
    didFinishAnimating: false,
    sortBy: null,
    isAscending: false,
    countryList: this.props.countries,
    selectedComparator: 'title',
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishAnimating: true });
    });
  }

  _handleSort = (comparatorField: string) => {
    let sortedCountryList = this.state.countryList;

    let ascendingSort = this.state.isAscending;
    if (this.state.selectedComparator == comparatorField) {
      ascendingSort = !ascendingSort;
    }

    switch (comparatorField) {
      case 'title':
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'Country',
          !ascendingSort
        );
        break;
      case 'confirmed':
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalConfirmed',
          ascendingSort
        );
        break;
      case 'deaths':
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalDeaths',
          ascendingSort
        );
        break;
      case 'recovered':
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalRecovered',
          ascendingSort
        );
        break;
      default:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'Country',
          ascendingSort
        );
    }
    this.setState({
      countryList: sortedCountryList,
      selectedComparator: comparatorField,
      isAscending: ascendingSort,
    });
  };

  _renderFlatList = () => {
    const { countryList } = this.state;

    const showHeaders = (
      <FlatListHeader
        title={'Countries'}
        onPress={(comparator: string) => this._handleSort(comparator)}
      />
    );
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={showHeaders}
          data={countryList}
          renderItem={({ item, index }) => (
            <HorizontalRowItem
              onPress={() =>
                this.props.navigation.navigate(Screens.COUNTRY_DETAILED_DATA, {
                  country: item,
                  total: this.props.summary.Global,
                })
              }
              overallData={{
                state: item.Country,
                confirmed: item.TotalConfirmed,
                deltaconfirmed: item.NewConfirmed,
                recovered: item.TotalRecovered,
                deltarecovered: item.NewRecovered,
                deltadeaths: item.NewDeaths,
                deaths: item.TotalDeaths,
                countryOrStateCode: item.CountryCode,
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
    countries: state.covidWorld.summary.Countries,
    summary: state.covidWorld.summary,
  };
};

export default connect(mapStateToProps, null)(CountriesList);
