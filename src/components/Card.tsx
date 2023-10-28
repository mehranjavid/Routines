import styled from 'styled-components/native';
import {useCallback, useState} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {Switch} from './Switch';
import {THEME} from '../shared/Constant';
import {ColorProps, Styles} from '../shared/Types';
import {
  VerticalView as _VerticalView,
  HorizontalView as _HorizontalView,
  Button as _Button,
} from '../shared/Styles';

interface Props {
  mode: string;
  heading: string;
  subHeading: string;
  styles: Styles;
  image: ImageSourcePropType;
  button: ImageSourcePropType;
}

export const Card = (Props: Props) => {
  const [morningRoutineSelected, setMorningRoutineSelected] = useState(false);
  const _toggleMorningRoutine = useCallback(
    (state: boolean) => {
      setMorningRoutineSelected(state);
    },
    [morningRoutineSelected],
  );
  return (
    <Container styles={Props.styles}>
      <HorizontalView>
        <VerticalViewLeft>
          <Title
            color={
              Props.mode == 'light' ? THEME.tinted_black : THEME.tinted_white
            }>
            {Props.heading}
          </Title>
          <Title
            color={
              Props.mode == 'light' ? THEME.tinted_black : THEME.tinted_white
            }>
            {Props.subHeading}
          </Title>
          <SwitchView>
            <Switch
              isEnabled={morningRoutineSelected}
              onPress={_toggleMorningRoutine}
            />
          </SwitchView>
        </VerticalViewLeft>
        <VerticalViewRight>
          <Image source={Props?.image} />
          <Button>
            <Image source={Props?.button} />
          </Button>
        </VerticalViewRight>
      </HorizontalView>
    </Container>
  );
};

const VerticalViewLeft = styled(_VerticalView)`
  justify-content: space-around;
`;
const VerticalViewRight = styled(_VerticalView)`
  justify-content: space-around;
  align-items: flex-end;
`;
const HorizontalView = styled(_HorizontalView)`
  justify-content: space-between;
`;

const Button = styled(_Button)`
  margin-top: 5px;
`;

const Container = styled.View<{styles: Styles}>`
  ${({styles}) =>
    styles &&
    Object.entries(styles)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n')}
  height: 100px;
  width: 168px;
  border-radius: 12px;
  padding: 10px;
`;

const SwitchView = styled.View`
  margin-top: 6px;
`;

const Title = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({color}) => color};
`;
