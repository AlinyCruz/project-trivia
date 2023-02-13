import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <h2>
        Você esta na pagina de Ranking!!!
      </h2>
    );
  }
}

export default connect()(Ranking);
