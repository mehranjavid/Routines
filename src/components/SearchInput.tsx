import styled from 'styled-components/native';
import {
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Button as _Button} from '../shared/Styles';
import {THEME} from '../shared/Constant';

const searchIcon = require('../assets/images/search.png');

export interface SearchProps {
  value: string;
  _handleChange: (value: string) => void;
  _handleSearch: () => void;
}

export const SearchInput = (Props: SearchProps) => {
  const handleInputChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newText = event.nativeEvent.text;
    Props._handleChange(newText);
  };

  return (
    <Container>
      <Input value={Props.value} onChange={handleInputChange} />
      <Button onPress={Props._handleSearch}>
        <Image source={searchIcon} />
      </Button>
    </Container>
  );
};

const Button = styled(_Button)`
  width: 41px;
  background-color: ${THEME.selected_green};
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  height: 50px;
  width: 299px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  padding: 0px;
`;

const Input = styled.TextInput`
  width: 255px;
  padding-left: 5px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: ${THEME.night_black};
`;
