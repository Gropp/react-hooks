export const getQuote = () =>
  // a constant com endereco do fetch esta no arquivo .env na raiz
  // o process busca variaveis de ambiente
  fetch(process.env.REACT_APP_API).then((response) => response.json());
