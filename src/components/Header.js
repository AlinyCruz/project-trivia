import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5'

class Header extends React.Component {
  render() {
    const { nome } = this.props;
    return (
      <div>
        <header>
          Bem Vindo,
          {nome}
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  nome: state.user.nome,
});
Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Header);
