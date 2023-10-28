import styled from 'styled-components/native';
import {Card} from '../../components/Card';
import {THEME} from '../../shared/Constant';

export const Routines = () => {
  return (
    <Container>
      <Card
        backgroundColor={THEME.sky_blue}
        heading={'Weekdays'}
        subHeading={'7:00 AM'}
        styles={MorningStyles}
        image={require('../../assets/images/morning.png')}
        button={require('../../assets/images/angleButtonGreater.png')}
      />
    </Container>
  );
};

const Container = styled.View`
  height: 100px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
`;

const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #bf4f74;
`;

const MorningStyles = {
  backgroundColor: THEME.sky_blue,
};
