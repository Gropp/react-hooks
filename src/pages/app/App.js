import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import narutoImg from '../../images/naruto.png';
import jutsoSound from '../../sounds/jutso.mp3';
import { Quotes } from '../../components';
import { getQuote } from '../../services';

// importa o audio e joga o arquivo dentro de uma constante
const audio = new Audio(jutsoSound);

export function App() {
  // o hook useRef mantem o valor da variavel
  // criamos o flag para dizer que o componente esta montado
  const isMounted = useRef(true);
  // descontrucao de array, esta passando os valore do state para as variaveis quote e setQuote
  // useState cria e atualiza um estado
  const [quote, setQuote] = useState({
    speaker: 'Loading speaker...',
    quote: 'Loading Quote'
  });

  const onUpdate = async () => {
    const resQuote = await getQuote();

    // nao se atualiza estados de componentes desmontados (que nao existe mais)
    // por isso se testa o componente antes de manipular o seu estado
    if (isMounted.current) {
      setQuote(resQuote);
      audio.play();
    }
  };

  // useEffect serve para reagir a propriedades alteradas - alterou, executa - só executa uma vez, quando o objeto é criado
  useEffect(() => {
    onUpdate();

    // apos a execução o componente é desmontado
    return () => {
      isMounted.current = false;
    };
  }, []);

  // codigo JSX
  return (
    <Content>
      {/* podemos declarar o objeto com o shorthand ... (quote = {quote.quote/speaker}) - operador spread */}
      <Quotes {...quote} onUpdate={onUpdate} />
      <NarutoImg alt="Naruto holding a kunai" src={narutoImg} />
    </Content>
  );
}

// styled-component
const Content = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NarutoImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`;
