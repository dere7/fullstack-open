const Total = (props) => {
  let parts = props.parts

  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[1].exercises}</p>
  );
}

export default Total
