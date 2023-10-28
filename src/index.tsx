import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {Routines} from './screens';
import {Header} from './components/Header';
import {THEME, CONTENT} from './shared/Constant';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME.base} />
      <Container>
        <Header title={CONTENT.title} />
        <Routines />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  height: 100%;
  background-color: #fdfcff;
`;

export default App;
