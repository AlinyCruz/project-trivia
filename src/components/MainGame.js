import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import md5 from 'crypto-js/md5';

class MainGame extends React.Component {
  render() {
    // const { name, score, gravatarEmail } = this.props;
    // console.log(gravatarEmail);
    // const hash = md5(gravatarEmail).toString();
    // const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        Eu sou a main Game!!!
        <header>
          {/* <div>
            <img src={ url } alt="gravatar" data-testid="header-profile-picture" />
          </div>
          Bem Vindo,
          <h3 data-testid="header-player-name">
            { name }
          </h3>
          <p data-testid="header-score">{ score }</p> */}
        </header>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   gravatarEmail: state.player.gravatarEmail,
//   score: state.player.score,
// });

// Header.propTypes = {
//   score: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   gravatarEmail: PropTypes.string.isRequired,
// }.isRequired;

export default connect()(MainGame);
