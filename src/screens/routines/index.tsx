import styled from 'styled-components/native';
import axios from 'axios';
import {ActivityIndicator, FlatList, Image, Platform, View} from 'react-native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {ColorProps, RoutineDataType} from '../../shared/Types';
import {SearchInput} from '../../components/SearchInput';
import {useCallback, useEffect, useState} from 'react';
import {fetchData} from '../../utils/api';
import {useData} from '../../utils/store';

const filterIcon = require('../../assets/images/filter.png');
const cloud_moon = require('../../assets/images/cloud_moon.png');
const morningImage = require('../../assets/images/morning.png');
const nightImage = require('../../assets/images/night.png');
const angleButton = require('../../assets/images/angleButtonGreater.png');
const angleButtonWhite = require('../../assets/images/angleButtonGreaterWhite.png');

const Item = ({name, schedule, visualAidUrl}: RoutineDataType) => {
  const [imageSource, setImageSource] = useState({});
  const [imageAvailable, setImageAvailable] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(visualAidUrl, {responseType: 'blob'});

      const reader = new FileReader();
      reader.onload = () => {
        setImageSource({uri: reader.result});
        setImageAvailable(true);
      };
      reader.onerror = () => {
        setImageAvailable(false);
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.log('Image fetch error:', error);
    }
  };

  return (
    <FlatlistItems>
      <_HorizontalView>
        {imageAvailable ? (
          <FlatlistItemImage
            source={imageSource}
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <RoutinesImage>
            <RoutineImageContent>R</RoutineImageContent>
          </RoutinesImage>
        )}
        <_VerticalView>
          <FlatlistItemsTitle color={THEME.lable}>{name}</FlatlistItemsTitle>
          <FlatlistItemsTitle color={THEME.lable}>
            {Object.keys(schedule)[0] +
              ' ' +
              schedule[Object.keys(schedule)[0]] || 'No Appointments'}
          </FlatlistItemsTitle>
        </_VerticalView>
      </_HorizontalView>
      <Image source={angleButton} />
    </FlatlistItems>
  );
};

export const Routines = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);

  const setData = useData(state => state.setData);
  const setPagesCount = useData(state => state.setPages);
  const data = useData(state => state.data);
  const hasNextPage = useData(state => state.hasNextPage);
  const nextPage = useData(state => state.nextPage);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let page = hasNextPage ? nextPage : 1;
    setLoadingList(true);
    fetchData(page, 10)
      .then(res => {
        const extractedData = res.docs.map(
          ({name, schedule, visualAidUrl, _id}) => ({
            name,
            schedule,
            visualAidUrl,
            _id,
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

  const search = useCallback(() => {}, []);

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
        <Button>
          <Image source={filterIcon} />
        </Button>
      </ActionView>
      <FlatListView style={{flex: 1}}>
        <BackgroundImage source={cloud_moon} resizeMode="center" />
        {loading ? (
          <RoutineImageContent>Loading...</RoutineImageContent>
        ) : (
          <FlatList
            data={data as RoutineDataType[]}
            renderItem={({item}: {item: RoutineDataType}) => (
              <Item
                name={item.name}
                schedule={item.schedule}
                visualAidUrl={item.visualAidUrl}
                _id={item._id}
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

const ActionView = styled(_HorizontalView)`
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 12px;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled(_Button)``;

const RoutinesImage = styled.View`
  height: 46px;
  width: 46px;
  background-color: #c4c4c4;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

const RoutineImageContent = styled.Text`
  font-size: 24px;
  font-weight: 500;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  margin-top: 46px;
`;

const FlatListView = styled.View`
  flex: 1;
  padding: 16px;
`;

const FlatlistItems = styled(_HorizontalView)`
  justify-content: space-between;
  align-items: center;
  margin-left: 4px;
  margin-right: 4px;
`;

const FlatlistItemImage = styled.Image`
  height: 46px;
  width: 46px;
  margin-right: 5px;
`;

const FlatlistItemsSeperator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #bac1ca;
  margin: 10px;
`;

const FlatlistItemsTitle = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({color}) => color};
`;

const CardView = styled(_VerticalView)`
  align-items: center;
`;

const CardsView = styled(_HorizontalView)`
  width: 100%;
  height: 158px;
  margin-top: 24px;
  justify-content: space-around;
  padding-right: 15px;
  padding-left: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  ${Platform.OS === 'ios' &&
  `
    shadowColor: #000;
    shadowOffset: { width: 0, height: 0 };
    shadowOpacity: 0.2;
    shadowRadius: 2;
  `}
  ${Platform.OS === 'android' &&
  `
    elevation: 0;
  `}
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
`;

const Title = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
  color: ${({color}) => color};
`;

const MorningStyles = {
  backgroundColor: THEME.sky_blue,
};

const NightStyles = {
  backgroundColor: THEME.night_black,
};
