import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class FeedbackHeader extends React.Component {
  handlePlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { name, score, gravatarEmail } = this.props;
    console.log(gravatarEmail);
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <header>
          <div>
            <img src={ url } alt="gravatar" data-testid="header-profile-picture" />
          </div>
          Feedback
          <h3 data-testid="header-player-name">
            { name }
          </h3>
          <p data-testid="header-score">{ score }</p>
        </header>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Ranking
        </button>
      </div>
    );
  }
}

FeedbackHeader.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(FeedbackHeader);
