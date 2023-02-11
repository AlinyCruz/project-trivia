import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const numero = 0.5;
const opcoes = [];

class MainGame extends React.Component {
  state = {
    dados: [],
    resposta: [],
  };

  async componentDidMount() {
    const { history } = this.props;

    try {
      const recoveryToken = localStorage.getItem('token');
      console.log(recoveryToken);
      const url = `https://opentdb.com/api.php?amount=5&token=${recoveryToken}`;
      const response = await fetch(url);
      const dataQuestion = await response.json();
      const codeResponse = 3;

      if (dataQuestion.response_code === codeResponse) {
        console.log('entrou');
        localStorage.removeItem('token');
        return history.push('/');
      }
      this.setState({
        dados: dataQuestion.results,
      }, () => this.criaOpcoes());
    } catch (error) {
      console.log(error);
    }
  }

  embaralhar = (xablau) => xablau.sort(() => Math.random() - numero);

  criaOpcoes = () => {
    const { dados } = this.state;
    opcoes.push(...dados[0].incorrect_answers.map((e) => e));
    opcoes.push(dados[0].correct_answer);
    this.setState({
      resposta: this.embaralhar(opcoes),
    });
  };

  render() {
    const { dados, resposta } = this.state;
    console.log(dados[0]?.question);
    return (
      <div>
        <div>
          <p data-testid="question-text">{dados[0]?.question}</p>
          <p data-testid="question-category">{dados[0]?.category}</p>
        </div>
        <div data-testid="answer-options">
          {resposta && resposta?.map((dado, i) => (
            <button
              key={ i }
              data-testid={ dado === dados[i]
                .correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
            >
              { dado }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

MainGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(MainGame);
