// export const CAPTURA_TOKEN = 'CAPTURA_TOKEN';
export const CAPTURA_NOME = 'CAPTURA_NOME';

// export const actionToken = (tokens) => ({
//   type: CAPTURA_TOKEN,
//   tokens,
// });

export const actionNome = (name, email) => ({
  type: CAPTURA_NOME,
  name,
  email,
});

export const fetchToken = async () => {
  const DATA_API = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(DATA_API);
  const { token } = await response.json();
  console.log(token);
  return localStorage.setItem('token', token);
};
