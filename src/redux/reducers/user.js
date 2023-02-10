import { CAPTURA_NOME, CAPTURA_TOKEN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  nome: '',
  token: '',
  email: '',
  score: 0,
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CAPTURA_NOME:
    return {
      ...state,
      nome: action.nome,
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
