
const Maybe = (value) => {
  const Nothing = {
    bind: (fn) => this,
    isNothing: () => true,
    val: () => {throw new Error("cannot call val() nothing")},
    maybe: (def, fn) => def
  };

  const Something = (value) => {
    return {
      bind: (fn) => fn.call(this, value),
      isNothing: () => false,
      val: () => value,
      maybe: (def, fn) => fn.call(this, value)
    };
  };

  if(typeof value === 'undefined' || value === null)
    return Nothing;

  return Something(value);
};

export default Maybe;
