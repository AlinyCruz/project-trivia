import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    return (
      <h2
        data-testid="feedback-text"
      >
        Você esta na pagina de Feedback!!!
      </h2>
    );
  }
}
export default connect()(Feedback);
