import React, { Component } from "react";
import '../../css/Timer.css'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(prevSate => ( {
        count: prevSate.count - 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
      clearInterval(this.myInterval); 
  }

  render() {
    const {count} = this.state;

    return (
        <div class="count-down-timer-val">({count})s</div>
    );
  }
}

export default Timer;
