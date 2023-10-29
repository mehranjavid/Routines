import styled from 'styled-components/native';
import {FlatList, Image, Platform} from 'react-native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {ColorProps} from '../../shared/Types';
import {SearchInput} from '../../components/SearchInput';
import {useCallback, useEffect, useState} from 'react';

const filterIcon = require('../../assets/images/filter.png');
const cloud_moon = require('../../assets/images/cloud_moon.png');
const morningImage = require('../../assets/images/morning.png');
const nightImage = require('../../assets/images/night.png');
const angleButton = require('../../assets/images/angleButtonGreater.png');
const angleButtonWhite = require('../../assets/images/angleButtonGreaterWhite.png');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-ae5-3ad53abb28ba',
    title: '1 Item',
    image:
      'https://goally-files-dev.s3.amazonaws.com/visualaids/symbol/pets/dogfood1.png',
  },
  {
    id: 'bd7acbea-c1b1-46c2-assse5-3ad53abb28ba',
    title: '1 Item',
    image:
      'https://goally-files-dev.s3.amazonaws.com/visualaids/symbol/pets/dogfood1.png',
  },
  {
    id: 'bd7acbea-c1b1-46c2-axssse5-3ad53abb28ba',
    title: '1 Item',
    image:
      'https://goally-files-dev.s3.amazonaws.com/visualaids/symbol/pets/dogfod1.png',
  },
];

type ItemProps = {title: string; id: string; image: string};

const Item = ({title, id, image}: ItemProps) => {
  const [imageSource, setImageSource] = useState({});
  const [imageAvailable, setImageAvailable] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(image);
        const data = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          setImageSource({uri: reader.result});
          setImageAvailable(true);
        };
        reader.onerror = error => {
          setImageAvailable(false);
        };
        reader.readAsDataURL(data);
      } catch (error) {
        console.log('Image fetch error:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <FlatlistItems>
      <_HorizontalView>
        {imageAvailable ? (
          <FlatlistItemImage
            source={imageSource}
            onError={error => console.log('Image load error:', error)}
          />
        ) : (
          <RoutinesImage>
            <RoutineImageContent>R</RoutineImageContent>
          </RoutinesImage>
        )}
        <_VerticalView>
          <FlatlistItemsTitle color={'#1A1C1E'}>{title}</FlatlistItemsTitle>
          <FlatlistItemsTitle color={'#1A1C1E'}>{title}</FlatlistItemsTitle>
        </_VerticalView>
      </_HorizontalView>
      <Image source={angleButton} />
    </FlatlistItems>
  );
};

export const Routines = () => {
  const [searchValue, setSearchValue] = useState('');

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
        <FlatList
          data={DATA as ItemProps[]}
          renderItem={({item}: {item: ItemProps}) => (
            <Item title={item.title} id={item.id} image={item.image} />
          )}
          keyExtractor={(item: ItemProps) => item.id}
          ItemSeparatorComponent={() => {
            return <FlatlistItemsSeperator />;
          }}
        />
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
