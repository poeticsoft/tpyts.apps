export const datapath = (pathstring, data) => pathstring
  .split('.')
  .reverse()
  .reduce(
    (result, step, index) => ({ [step]: (index == 0) ? data : result }),
    {}
  )