import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <div>Você esta na pagina do Jogo!!!</div>
    );
  }
}
export default connect()(Game);
