import styled from 'styled-components/native';
import {Image, Platform} from 'react-native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {ColorProps} from '../../shared/Types';
import {SearchInput} from '../../components/SearchInput';
import {useCallback, useState} from 'react';

const filterIcon = require('../../assets/images/filter.png');

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
            image={require('../../assets/images/morning.png')}
            button={require('../../assets/images/angleButtonGreater.png')}
          />
        </CardView>
        <CardView>
          <Title color={THEME.lable}>Night Routine</Title>
          <Card
            mode="dark"
            heading={'Everyday'}
            subHeading={'9:00 PM'}
            styles={NightStyles}
            image={require('../../assets/images/night.png')}
            button={require('../../assets/images/angleButtonGreaterWhite.png')}
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
  height: 100%;
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
