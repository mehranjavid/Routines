import styled from 'styled-components/native';
import {Image, View} from 'react-native';
import {THEME} from '../shared/Constant';

const header = require('../assets/images/header.png');
const settings = require('../assets/images/settings.png');

export interface HeaderProps {
  title: string;
}

export const Header = (Props: HeaderProps) => {
  return (
    <Container>
      <View>
        <Image source={header} />
      </View>
      <Title>{Props.title}</Title>
      <View>
        <Image source={settings} />
      </View>
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
