import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {Routines} from './screens';
import {Header} from './components/Header';
import {THEME, CONTENT} from './shared/Constant';

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME.base} />
      <SafeAreaView style={{flex: 0, backgroundColor: THEME.base}} />
      <Container>
        <Header title={CONTENT.title} />
        <Routines />
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fdfcff;
`;

export default App;
