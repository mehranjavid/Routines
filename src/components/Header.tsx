import styled from 'styled-components/native';
import {Image} from 'react-native';
import {THEME} from '../shared/Constant';
import {HeaderProps} from '../shared/Types';
import {Button} from '../shared/Styles';

const header = require('../assets/images/header.png');
const settings = require('../assets/images/settings.png');

export const Header = (Props: HeaderProps) => {
  return (
    <Container>
      <Button>
        <Image source={header} />
      </Button>
      <Title>{Props.title}</Title>
      <Button>
        <Image source={settings} />
      </Button>
    </Container>
  );
};

const Container = styled.View`
  height: 100px;
  background-color: ${THEME.base};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #ffffff;
`;
