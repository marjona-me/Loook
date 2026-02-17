// let createElement = (...array) => {
//     return array.map((e) => document.querySelector(e));
// }

let createElement = (...tags) => {
  return tags.map(tag => document.createElement(tag));
};
