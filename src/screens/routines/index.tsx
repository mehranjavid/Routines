import {ActivityIndicator, FlatList, Image, View} from 'react-native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {RoutineDataType} from '../../shared/Types';
import {SearchInput} from '../../components/SearchInput';
import {useCallback, useEffect, useState} from 'react';
import {fetchData} from '../../utils/api';
import {useData} from '../../utils/store';
import {
  ActionView,
  BackgroundImage,
  Button,
  CardView,
  CardsView,
  Container,
  FlatListView,
  FlatlistItemsSeperator,
  MorningStyles,
  NightStyles,
  RoutineImageContent,
  Title,
} from './styles';
import {Item} from './Items';
import {filterActivity, searchActivity} from '../../utils/helpers';

const filterIcon = require('../../assets/images/filter.png');
const cloud_moon = require('../../assets/images/cloud_moon.png');
const morningImage = require('../../assets/images/morning.png');
const nightImage = require('../../assets/images/night.png');
const angleButton = require('../../assets/images/angleButtonGreater.png');
const angleButtonWhite = require('../../assets/images/angleButtonGreaterWhite.png');

export const Routines = () => {
  const setData = useData(state => state.setData);
  const setPagesCount = useData(state => state.setPages);
  const data = useData(state => state.data);
  const hasNextPage = useData(state => state.hasNextPage);
  const nextPage = useData(state => state.nextPage);

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [routineList, setRoutineList] = useState(data);
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setRoutineList(data);
  }, [data]);

  const getData = () => {
    let page = hasNextPage ? nextPage : 1;
    setLoadingList(true);
    fetchData(page, 10)
      .then(res => {
        const extractedData = res.docs.map(
          ({name, schedule, visualAidUrl, _id, createdAt}) => ({
            name,
            schedule,
            visualAidUrl,
            _id,
            createdAt,
          }),
        );
        setData([...data, ...extractedData]);
        setPagesCount(
          res.totalPages,
          res.hasPrevPage,
          res.hasNextPage,
          res.prevPage,
          res.nextPage,
        );
      })
      .finally(() => {
        setLoading(false);
        setLoadingList(false);
      });
  };

  const search = useCallback(() => {
    setRoutineList(searchActivity(routineList, searchValue));
  }, [searchValue]);

  const _handleFilter = () => {
    setRoutineList(filterActivity(routineList, filter));
    setFilter(!filter);
  };

  return (
    <Container>
      <CardsView>
        <CardView>
          <Title color={THEME.lable}>Morning Routine</Title>
          <Card
            mode="light"
            heading={'Weekdays'}
            subHeading={'7:00 AM'}
            styles={MorningStyles}
            image={morningImage}
            button={angleButton}
          />
        </CardView>
        <CardView>
          <Title color={THEME.lable}>Night Routine</Title>
          <Card
            mode="dark"
            heading={'Everyday'}
            subHeading={'9:00 PM'}
            styles={NightStyles}
            image={nightImage}
            button={angleButtonWhite}
          />
        </CardView>
      </CardsView>
      <ActionView>
        <SearchInput
          value={searchValue}
          _handleChange={setSearchValue}
          _handleSearch={search}
        />
        <Button onPress={_handleFilter}>
          <Image source={filterIcon} />
        </Button>
      </ActionView>
      <FlatListView style={{flex: 1}}>
        <BackgroundImage source={cloud_moon} resizeMode="center" />
        {loading ? (
          <ActivityIndicator size="large" color={THEME.selected_green} />
        ) : (
          <FlatList
            data={routineList as RoutineDataType[]}
            renderItem={({item}: {item: RoutineDataType}) => (
              <Item
                name={item.name}
                schedule={item.schedule}
                visualAidUrl={item.visualAidUrl}
                _id={item._id}
                createdAt={item.createdAt}
              />
            )}
            keyExtractor={(item: RoutineDataType) => item._id}
            ItemSeparatorComponent={() => {
              return <FlatlistItemsSeperator />;
            }}
            ListEmptyComponent={() => {
              return (
                <RoutineImageContent>No data available</RoutineImageContent>
              );
            }}
            onEndReached={() => {
              if (hasNextPage && !loadingList) {
                getData();
              }
            }}
            ListFooterComponent={() => {
              if (!loadingList) return null;
              return (
                <View style={{bottom: 10}}>
                  <ActivityIndicator
                    size="small"
                    color={THEME.selected_green}
                  />
                </View>
              );
            }}
          />
        )}
      </FlatListView>
    </Container>
  );
};
