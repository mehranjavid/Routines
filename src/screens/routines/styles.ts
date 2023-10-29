import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {THEME} from '../../shared/Constant';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {ColorProps} from '../../shared/Types';

export const ActionView = styled(_HorizontalView)`
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 12px;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled(_Button)``;

export const RoutinesImage = styled.View`
  height: 46px;
  width: 46px;
  background-color: #c4c4c4;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

export const RoutineImageContent = styled.Text`
  font-size: 24px;
  font-weight: 500;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  margin-top: 46px;
`;

export const FlatListView = styled.View`
  flex: 1;
  padding: 16px;
`;

export const FlatlistItems = styled(_HorizontalView)`
  justify-content: space-between;
  align-items: center;
  margin-left: 4px;
  margin-right: 4px;
`;

export const FlatlistItemImage = styled.Image`
  height: 46px;
  width: 46px;
  margin-right: 5px;
`;

export const FlatlistItemsSeperator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #bac1ca;
  margin: 10px;
`;

export const FlatlistItemsTitle = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: ${({color}) => color};
`;

export const CardView = styled(_VerticalView)`
  align-items: center;
`;

export const CardsView = styled(_HorizontalView)`
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

export const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: flex-start;
`;

export const Title = styled.Text<ColorProps>`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
  color: ${({color}) => color};
`;

export const MorningStyles = {
  backgroundColor: THEME.sky_blue,
};

export const NightStyles = {
  backgroundColor: THEME.night_black,
};
