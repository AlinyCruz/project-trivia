import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainGame from '../components/MainGame';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainGame />
        <h2>Você esta na pagina do Jogo!!!</h2>
      </div>
    );
  }
}
export default connect()(Game);
