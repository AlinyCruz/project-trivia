import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { nome, score, email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <header>
          <div>
            <img src={ url } alt="gravatar" data-testid="header-profile-picture" />
          </div>
          Bem Vindo,
          <h3 data-testid="header-player-name">
            { nome }
          </h3>
          <p data-testid="header-score">{ score }</p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  nome: state.user.nome,
  email: state.user.email,
  score: state.user.score,
});
Header.propTypes = {
  score: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
