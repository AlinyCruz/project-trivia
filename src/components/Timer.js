import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.inId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    const SECONDS = 0;
    if (prevState.seconds === SECONDS) {
      this.setState({ seconds: 30 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.inId);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1>{seconds}</h1>
    );
  }
}
export default Timer;
