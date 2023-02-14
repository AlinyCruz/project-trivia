import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MainGame.css';
import Timer from './Timer';

const numero = 0.5;

class MainGame extends React.Component {
  state = {
    dados: [],
    resposta: [],
    habilitBorder: false,
    nextBtn: false,
    isDisabled: false,
    contador: 0,
    opcoes: [],

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

  // handleFeedback = () => {
  //   const { history } = this.props;
  //   history.push('/feedback');
  // };

  embaralhar = (xablau) => xablau.sort(() => Math.random() - numero);

  criaOpcoes = () => {
    const { dados, contador, opcoes } = this.state;
    opcoes.push(...dados[contador].incorrect_answers.map((e) => e));
    opcoes.push(dados[contador].correct_answer);
    this.setState({
      resposta: this.embaralhar(opcoes),
    });
  };

  handleNext = () => {
    const { history } = this.props;
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
      habilitBorder: false,
      nextBtn: false,
      isDisabled: false,
      resposta: [],
      opcoes: [],
    }), () => {
      const countOpcoes = 5;
      const { contador } = this.state;
      if (contador === countOpcoes) {
        return history.push('/feedback');
      }
      this.criaOpcoes();
    });
  };

  handleClick = () => {
    // const { habilitBorder } = this.state;
    this.setState({
      habilitBorder: true,
      nextBtn: true,

    });
  };

  handleTimer = () => {
    this.setState({
      isDisabled: true,

    });
  };

  render() {
    const { dados, resposta, habilitBorder, nextBtn, isDisabled, contador } = this.state;
    console.log(dados[contador]?.question);
    console.log(contador);
    return (
      <div>
        <div>
          <p data-testid="question-text">{dados[contador]?.question}</p>
          <p data-testid="question-category">{dados[contador]?.category}</p>
        </div>
        <div data-testid="answer-options">
          {resposta && resposta?.map((dado, i) => (
            <button
              key={ i }
              data-testid={ dado === dados[contador]
                .correct_answer ? 'correct-answer' : `wrong-answer-${i}` }
              onClick={
                () => this.handleClick()
              }
              className={ habilitBorder && (dado === dados[contador]
                .correct_answer ? 'green' : 'red') }
              disabled={ isDisabled }
            >
              { dado }
            </button>
          ))}
        </div>
        { nextBtn && (
          <button
            data-testid="btn-next"
            onClick={ this.handleNext }
          >
            Next
          </button>
        )}

        <Timer handleTimer={ this.handleTimer } />

        {/* <button
          onClick={ this.handleFeedback }
        >
          Feedback
        </button> */}
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
