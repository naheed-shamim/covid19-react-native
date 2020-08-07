import React from 'react';
import {
  FlatList,
  InteractionManager,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  FlatListHeader,
  showLoader,
} from '../../common/components/CommonElements';
import { HorizontalRowItem } from '../../common/components/HorizontalRowItem';
import { SearchBar } from '../../common/components/Searchbar';
import TextPicker from '../../common/components/TextPicker';
import { WithTheme } from '../../common/hoc/WithTheme';
import { Screens } from '../../navigation/Constants';
import { getStateDistrictStats } from '../../redux/actions/CovidIndiaActions';
import { sortArrayBy } from '../../utils/CommonUtils';
import BaseComponent from '../BaseComponent';
import { icons } from '../../constants/Constants';
import CommonSort, { SortOptions } from '../../common/components/CommonSort';

class StateWiseList extends BaseComponent {
  stateHolder: any;
  constructor(props: any) {
    super(props);
    this.stateHolder = this.props.statewise;
  }
  state = {
    didFinishAnimating: false,
    isAscending: false,
    stateList: this.props.statewise,
    selectedComparator: 'title',
    searchQuery: '',
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
    this.stateHolder = sortedCountryList;
  };

  _showSearchBar = () => {
    return (
      <SearchBar onChangeText={this._onSearchDone} placeHolder='Search Here' />
    );
  };

  _onSearchDone = (text) => {
    const newData = this.stateHolder.filter((item) => {
      const itemData = `${item.state.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ stateList: newData });
  };

  _renderSortView = () => {
    return (
      <CommonSort
        handleSortSelection={(selection) =>
          this._handleSortSelection(selection)
        }
      />
    );
  };

  _handleSortSelection = (comparatorField) => {
    let sortedCountryList = this.state.stateList;

    let ascendingSort = false;
    if (this.state.selectedComparator == comparatorField) {
      ascendingSort = !ascendingSort;
    }

    switch (comparatorField) {
      case SortOptions.Name:
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'state',
          !ascendingSort
        );
        break;
      case SortOptions.Confirmed:
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'confirmed',
          ascendingSort
        );
        break;
      case SortOptions.Deaths:
        sortedCountryList = sortArrayBy(
          this.state.stateList,
          'deaths',
          ascendingSort
        );
        break;
      case SortOptions.Recovered:
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
      isAscending: true,
    });
    this.stateHolder = sortedCountryList;
  };

  _renderFlatList = () => {
    const { stateDistrictWiseData = {}, route, themeColors } = this.props;
    const { stateList = [] } = this.state;

    const showHeaders = (
      <FlatListHeader
        title={'STATE'}
        onPress={(comparator: string) => this._handleSort(comparator)}
      />
    );

    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background }}>
        {this._showSearchBar()}
        {this._renderSortView()}
        <FlatList
          // ListHeaderComponent={showHeaders}
          data={stateList}
          renderItem={({ item, index }) => (
            <HorizontalRowItem
              serialNum={index + 1}
              overallData={item}
              onPress={() => {
                this.props.navigation.navigate(Screens.STATE_DETAILED_DATA, {
                  district: stateDistrictWiseData[item.state],
                  name: item.state,
                  state: item,
                  total: this.props.totalCases,
                });
              }}
            />
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

  _showLoader = (visible) => {
    return showLoader(visible);
  };

  render() {
    const { didFinishAnimating } = this.state;
    const options = ['Sort by cc', 'ccasds'];

    const view = didFinishAnimating
      ? this._renderFlatList()
      : this._showLoader(didFinishAnimating);

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TextPicker
          ref={'picker'}
          shouldOverlayDismiss={false}
          options={options}
          onSubmit={(value) => this._handleSortSelection(value)}
        />
        {view}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    stateDistrictWiseData: state.covidIndia.stateDistrictWiseData,
    statewise: state.covidIndia.statewise,
    totalCases: state.covidIndia.totalCases,
  };
};

const mapDispatchToProps = {
  getStateDistrictStats,
};

const withThemedComponent = WithTheme(StateWiseList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withThemedComponent);
