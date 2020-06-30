import React from 'react';

export default function Countdown(props) {
    const [counter, setCounter] = React.useState(props.timer);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <span>{counter}</span>   
  );
}
