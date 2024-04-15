export default (selected, actual) => {
  const availableHints = [];

  if(selected.x + selected.width < actual.x) {
    availableHints.push("Look to the right");
  }

  if(selected.y + selected.height < actual.y) {
    availableHints.push("It's below that one");
  }

  if(selected.x > actual.x + actual.width) {
    availableHints.push("Try to the left");
  }

  if(selected.y > actual.y + actual.height) {
    availableHints.push("Too low");
  }

  return availableHints.length > 0
    ? availableHints[Math.floor(Math.random() * availableHints.length)]
    : "";
}
