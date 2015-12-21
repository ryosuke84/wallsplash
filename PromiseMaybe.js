import Q          from "q";

const PromiseMaybe = (value) => {
  const Nothing = {
    // bind: (fn) => {
    //   console.log(`noop  currobj: ${this}`);
    //   return Q(Nothing)
    // },
    bind: (fn) => Q(Nothing),
    isNothing: () => true,
    val: () => {throw new Error("cannot call val() nothing")},
    maybe: (def, fn) => def
  };

  const Something = (value) => {
    return {
      bind: (fn) =>{
        const deferred =  Q.defer();
        Q(fn.call(this, value)).then((x) => deferred.resolve(PromiseMaybe(x)));
        return deferred.promise;
      },
      isNothing: () => false,
      val: () => value,
      maybe: (def, fn) => fn.call(this, value)
    };
  };

  if(typeof value === 'undefined' || value === null)
    return Q(Nothing);

  return Q(Something(value));
};

export default PromiseMaybe;
