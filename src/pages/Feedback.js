import React from 'react';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <h2
        data-testid="feedback-text"
      >
        Você esta na pagina de feedback!!!
      </h2>
    );
  }
}
export default connect()(Settings);
