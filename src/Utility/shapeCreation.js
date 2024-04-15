export default (canvasWidth, canvasHeight, numberOfShapes, minShapeWidth, maxShapeWidth, minShapeHeight, maxShapeHeight, colors) => {
  const shapes = [];
  let remaining = numberOfShapes;
  for(let i = 0; i < colors.length; ++i) {
    const perColor = Math.floor(remaining / colors.length);
    const toCreate = i === colors.length - 1
      ? remaining
      : Math.min(remaining, perColor - 1 + Math.floor(Math.random() * 3));
    for(let j = 0; j < toCreate; ++j) {
      const width = minShapeWidth + Math.floor(Math.random() * (maxShapeWidth - minShapeWidth));
      const height = minShapeHeight + Math.floor(Math.random() * (maxShapeHeight - minShapeHeight));
      shapes.push({
        x: Math.floor(Math.random() * (canvasWidth - width)),
        y: Math.floor(Math.random() * (canvasHeight - height)),
        width,
        height,
        color: colors[i],
      });
    }
    remaining -= toCreate;
  }

  return shapes;
};
