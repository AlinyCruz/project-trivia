import { CAPTURA_NOME, CAPTURA_TOKEN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  token: '',
  gravatarEmail: '',
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CAPTURA_NOME:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case CAPTURA_TOKEN:
    return {
      ...state,
      token: action.tokens,
    };
  default:
    return state;
  }
};
