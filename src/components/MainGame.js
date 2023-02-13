import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MainGame.css';
import Timer from './Timer';
import { implementScore } from '../redux/actions';

const numero = 0.5;
const opcoes = [];

class MainGame extends React.Component {
  state = {
    dados: [],
    resposta: [],
    habilitBorder: false,
  };

  async componentDidMount() {
    const { history } = this.props;

    try {
      const recoveryToken = localStorage.getItem('token');
      const url = `https://opentdb.com/api.php?amount=5&token=${recoveryToken}`;
      const response = await fetch(url);
      const dataQuestion = await response.json();
      const codeResponse = 3;

      if (dataQuestion.response_code === codeResponse) {
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

  handleScore = (isCorrect) => {
    const { dados } = this.state;
    const { time, score, dispatch } = this.props;
    const formula = 10;
    console.log(isCorrect, 'isCorrect');
    if (isCorrect === 'correct-answer') {
      const questionsArray = dados[0];
      console.log(questionsArray);
      const difficultyQuestion = questionsArray.difficulty;
      const valueDifficulty = { hard: 3, medium: 2, easy: 1 };
      const scoreValue = formula + (time * valueDifficulty[difficultyQuestion]);
      const sum = score + scoreValue;
      dispatch(implementScore(sum, 1));
      this.setState({
        expired: true,
      });
    } else {
      this.setState({
        expired: true,
      });
    }
  };

  //  handleResponse = () => {
  //  this.setState({
  //  response: true,
  //  freeze: true,
  //  counting: false,
  //  });
  //  };

  //  expireQuestion = () => {
  //  this.setState({
  //  expired: true,
  //  counting: false,
  //  freeze: true,
  //  });
  // };

  handleClick = (isCorrect) => {
    // const { habilitBorder } = this.state;
    this.setState({
      habilitBorder: true,

    });
    this.handleScore(isCorrect);
  };

  render() {
    const { dados, resposta, habilitBorder, nextBtn, isDisabled } = this.state;
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
                () => this.handleClick(dado === dados[0]
                  .correct_answer ? 'correct-answer' : `wrong-answer-${i}`)
              }
              className={ habilitBorder && (dado === dados[0]
                .correct_answer ? 'green' : 'red') }
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
    dispatch: PropTypes.func,
  }),
}.isRequired;

export default connect()(MainGame);
