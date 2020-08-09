import React from 'react';
import { FlatList, InteractionManager, View } from 'react-native';
import { connect } from 'react-redux';
import {
  FlatListHeader,
  showLoader
} from '../../common/components/CommonElements';
import CommonSort, { SortOptions } from '../../common/components/CommonSort';
import { HorizontalRowItem } from '../../common/components/HorizontalRowItem';
import { SearchBar } from '../../common/components/Searchbar';
import { WithTheme } from '../../common/hoc/WithTheme';
import { Screens } from '../../navigation/Constants';
import { sortArrayBy } from '../../utils/CommonUtils';

class CountriesList extends React.PureComponent {
  countriesHolder: any;
  constructor(props: any) {
    super(props);
    this.countriesHolder = this.props.countries;
  }
  state = {
    didFinishAnimating: false,
    sortBy: null,
    isAscending: false,
    countryList: this.props.countries,
    selectedComparator: SortOptions.Name,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishAnimating: true });
    });
  }

  _handleSort = (comparatorField: string, ascending: boolean = false) => {
    let sortedCountryList = this.state.countryList;

    switch (comparatorField) {
      case SortOptions.Name:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'Country',
          ascending
        );
        break;
      case SortOptions.Confirmed:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalConfirmed',
          ascending
        );
        break;
      case SortOptions.Deaths:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalDeaths',
          ascending
        );
        break;
      case SortOptions.Recovered:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'TotalRecovered',
          ascending
        );
        break;
      default:
        sortedCountryList = sortArrayBy(
          this.state.countryList,
          'Country',
          ascending
        );
    }
    this.setState({
      countryList: sortedCountryList,
      selectedComparator: comparatorField,
      isAscending: ascending,
    });
  };

  _showSearchBar = () => {
    return <SearchBar onChangeText={this._onSearchDone} />;
  };

  _onSearchDone = (text) => {
    const newData = this.countriesHolder.filter((item) => {
      const itemData = `${item.Country.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ countryList: newData });
  };

  _renderFlatList = () => {
    const { countryList } = this.state;
    const { themeColors } = this.props;
    const showHeaders = (
      <FlatListHeader
        title={'COUNTRIES'}
        onPress={(comparator: string) => this._handleSort(comparator)}
      />
    );
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background }}>
        {this._showSearchBar()}
        <CommonSort
          themeColors={this.props.themeColors}
          defaultValue={this.state.selectedComparator}
          isAscending={this.state.isAscending}
          handleSortSelection={(selection) => this._handleSort(selection)}
          onComparatorSelection={selection => {
            this.setState({ isAscending: selection }),
              this._handleSort(this.state.selectedComparator, selection)
          }}
        />
        <FlatList
          // ListHeaderComponent={showHeaders}
          data={countryList}
          renderItem={({ item, index }) => (
            <HorizontalRowItem
              showDailyInfo
              serialNum={index + 1}
              onPress={() =>
                this.props.navigation.navigate(Screens.COUNTRY_DETAILED_DATA, {
                  country: item,
                  total: this.props.summary.Global,
                  name: item.Country,
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

  _showLoader = (visible: boolean) => {
    return showLoader(visible);
  };

  render() {
    const { didFinishAnimating } = this.state;

    const showStateData = didFinishAnimating
      ? this._renderFlatList()
      : this._showLoader(didFinishAnimating);

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

const withThemedComponent = WithTheme(CountriesList);
export default connect(mapStateToProps, null)(withThemedComponent);
