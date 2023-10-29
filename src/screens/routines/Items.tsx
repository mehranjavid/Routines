import {useEffect, useState} from 'react';
import {RoutineDataType} from '../../shared/Types';
import axios from 'axios';
import {
  FlatlistItemImage,
  FlatlistItems,
  RoutinesImage,
  RoutineImageContent,
  FlatlistItemsTitle,
} from './styles';
import {
  HorizontalView as _HorizontalView,
  VerticalView as _VerticalView,
  Button as _Button,
} from '../../shared/Styles';
import {THEME} from '../../shared/Constant';
import {Image} from 'react-native';

const angleButton = require('../../assets/images/angleButtonGreater.png');

export const Item = ({name, schedule, visualAidUrl}: RoutineDataType) => {
  const [imageSource, setImageSource] = useState({});
  const [imageAvailable, setImageAvailable] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await axios.get(visualAidUrl, {responseType: 'blob'});

      const reader = new FileReader();
      reader.onload = () => {
        setImageSource({uri: reader.result});
        setImageAvailable(true);
      };
      reader.onerror = () => {
        setImageAvailable(false);
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.log('Image fetch error:', error);
    }
  };

  return (
    <FlatlistItems>
      <_HorizontalView>
        {imageAvailable ? (
          <FlatlistItemImage
            source={imageSource}
            onError={() => setImageAvailable(false)}
          />
        ) : (
          <RoutinesImage>
            <RoutineImageContent>R</RoutineImageContent>
          </RoutinesImage>
        )}
        <_VerticalView>
          <FlatlistItemsTitle color={THEME.lable}>{name}</FlatlistItemsTitle>
          <FlatlistItemsTitle color={THEME.lable}>
            {Object.keys(schedule)[0] +
              ' ' +
              schedule[Object.keys(schedule)[0]] || 'No Appointments'}
          </FlatlistItemsTitle>
        </_VerticalView>
      </_HorizontalView>
      <Image source={angleButton} />
    </FlatlistItems>
  );
};
