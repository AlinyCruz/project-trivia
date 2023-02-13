import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MainGame.css';
import Timer from './Timer';

const numero = 0.5;
const opcoes = [];

class MainGame extends React.Component {
  state = {
    dados: [],
    resposta: [],
    habilitBorder: false,
    isDisabled: false,
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

  handleClick = () => {
    // const { habilitBorder } = this.state;
    this.setState({
      habilitBorder: true,

    });
  };

  handleTimer = () => {
    this.setState({
      isDisabled: true,

    });
  };

  render() {
    const { dados, resposta, habilitBorder, isDisabled } = this.state;
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
              data-testid={ dado === dados[0]
                .correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
              onClick={
                () => this.handleClick()
              }
              className={ habilitBorder && (dado === dados[0]
                .correct_answer ? 'green' : 'red') }
              disabled={ isDisabled }
            >
              { dado }
            </button>
          ))}
        </div>
        <Timer handleTimer={ this.handleTimer } />
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
