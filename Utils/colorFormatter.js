export function rgbToHex(rgb) {
  return (
    '#' +
    rgb
      .match(/\d+/g)
      .map((x) => (+x).toString(16).padStart(2, '0'))
      .join('')
  );
}
