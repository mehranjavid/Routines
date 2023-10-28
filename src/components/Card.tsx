import styled from 'styled-components/native';
import {useCallback, useState} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {Switch} from './Switch';
import {THEME} from '../shared/Constant';
import {ColorProps, Styles} from '../shared/Types';
import {
  VerticalView as _VerticalView,
  HorizontalView as _HorizontalView,
  Button,
} from '../shared/Styles';

interface Props {
  backgroundColor: string;
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
          <Title color={THEME.tinted_black}>{Props.heading}</Title>
          <Title color={THEME.tinted_black}>{Props.subHeading}</Title>
          <Switch
            isEnabled={morningRoutineSelected}
            onPress={_toggleMorningRoutine}
          />
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
  justify-content: center;
`;
const VerticalViewRight = styled(_VerticalView)`
  justify-content: center;
  align-items: flex-end;
`;
const HorizontalView = styled(_HorizontalView)`
  justify-content: space-between;
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

const Title = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({color}) => color};
`;
