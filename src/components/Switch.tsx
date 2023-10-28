import styled from 'styled-components/native';
import {ColorProps} from '../shared/Types';

interface Props {
  isEnabled: boolean;
  onPress: (value: boolean) => void;
}

export const Switch = (Props: Props) => {
  return (
    <Container color={Props.isEnabled ? '#72CEBC' : '#72777F'}>
      <_Switch
        trackColor={{false: '#72777F', true: '#72CEBC'}}
        thumbColor={'white'}
        ios_backgroundColor="#72777F"
        onValueChange={Props.onPress}
        value={Props.isEnabled}
      />
    </Container>
  );
};

const Container = styled.View<ColorProps>`
  height: 32px;
  width: 51px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

const _Switch = styled.Switch`
  transform: scaleX(1.2) scaleY(1.2);
`;
