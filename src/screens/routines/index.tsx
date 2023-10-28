import styled from 'styled-components/native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
} from '../../shared/Styles';
import {ColorProps} from '../../shared/Types';

export const Routines = () => {
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
    </Container>
  );
};

const CardView = styled(_VerticalView)`
  align-items: center;
`;

const CardsView = styled(_HorizontalView)`
  width: 100%;
  margin-top: 24px;
  justify-content: space-around;
  padding-right: 15px;
  padding-left: 15px;
`;

const Container = styled.View`
  height: 100%;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
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
