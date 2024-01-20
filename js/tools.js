function loopThroughNodes() {
  for (let t = 0; t < arguments.length - 1; t++) {
    for (let i = 0; i < arguments[t].length; i++) {
      arguments[arguments.length - 1](arguments[t][i]);
    }
  }
}

function loopThroughParentsNode() {
  for (let t = 0; t < arguments.length - 1; t++) {
    for (let i = 0; i < arguments[t].length; i++) {
      arguments[arguments.length - 1](arguments[t][i].parentElement);
    }
  }
}

$ = function (selector) {
  const result = document.querySelectorAll(selector);
  if (result.length > 1) {
    return result;
  } else if (result.length <= 1) {
    return result[0];
  }
};
