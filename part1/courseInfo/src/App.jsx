function Header(prop) {
  return <h1>{prop.title}</h1>;
}

function Content(prop) {
  return (
    <>
      <Part title={prop.part[0].title} exercises={prop.part[0].exercises} />
      <Part title={prop.part[1].title} exercises={prop.part[1].exercises} />
      <Part title={prop.part[2].title} exercises={prop.part[2].exercises} />
    </>
  );
}

function Part(prop) {
  return (
    <>
      <div>
        {prop.title}: {prop.exercises}
      </div>
    </>
  );
}

function partObject(title, exercises) {
  this.title = title;
  this.exercises = exercises;
}

function Total(prop) {
  return (
    <>
      <p>Total number of exercises: {prop.total}</p>
    </>
  );
}

function App() {
  const course = "Half Stack Development";

  const part1 = new partObject("Fundamentals of React", 10);
  const part2 = new partObject("Using Props to pass data", 7);
  const part3 = new partObject("State of a component", 14);

  const parts = [part1, part2, part3];

  return (
    <>
      <Header title={course} />
      <Content part={parts} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  );
}

export default App;
