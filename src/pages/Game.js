import React from 'react';
import { connect } from 'react-redux';
// import { actionNome } from '../redux/actions';

class Games extends React.Component {

  render() {
    return (
      <div>
        Você esta na pagina do Jogo!!!
      </div>
    )
  }
}
export default connect()(Games);
