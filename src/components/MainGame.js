import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import md5 from 'crypto-js/md5';

class MainGame extends React.Component {
  render() {
    return (
      <div>
        Eu sou a main Game!!!

      </div>
    );
  }
}

export default connect()(MainGame);
