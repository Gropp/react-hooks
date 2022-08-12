import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getQuote } from './quotesService';

const response = { test: 'testing' };

// configuracao de um servidor ficticio para que a teste seja rodado offline
// teste unitarios vc testa a menor parte possivel do codigo da forma mais simples
const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
    // a resposta res vira com um ConTeXto que sera transformado em json
    return res(ctx.json(response));
  })
);
// antes de todos os testes o servidor comeca a escutar
beforeAll(() => server.listen());
// depois de cada teste sera dado um reset nos Handlers
afterEach(() => server.resetHandlers());
// e no final de tudo ele fecha o servidor
afterAll(() => server.close());

// vai transformar o json da resposta em um objeto
// é uma requisicao assincrona, por isso o uso do await (espera)
test('transforms json response into object', async () => {
  const quote = await getQuote();

  expect(quote).toStrictEqual(response);
});
