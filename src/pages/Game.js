import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2>Você esta na pagina do Jogo!!!</h2>
      </div>
    );
  }
}
export default connect()(Game);
