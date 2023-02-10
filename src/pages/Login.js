import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionNome, fetchToken } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validate());
  };

  validate = () => {
    const { email, name } = this.state;

    let validaEmail = false;

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex)) {
      validaEmail = true;
    } else {
      validaEmail = false;
    }

    const min = 3;
    const validaName = name.length >= min;

    const dataValidate = (validaEmail && validaName);

    this.setState({
      isDisabled: !dataValidate,
    });

    return dataValidate;
  };

  proximaPagina = (rota) => {
    const { history, dispatch } = this.props;
    const { nome, token } = this.state;
    dispatch(fetchToken(token));
    dispatch(actionNome(nome));
    return history.push(rota);
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            value={ email }
            type="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <input
            name="name"
            value={ name }
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ () => this.proximaPagina('/game') }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};

export default connect()(Login);
