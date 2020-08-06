const hookInputSetter = <T extends HTMLElement>(target: T, key: string) => {
  const orig = Object.getOwnPropertyDescriptor(target, key);
  Object.defineProperty(target, key, {
    set(value) {
      (this as T).dispatchEvent(new Event("coherevalueupdate"));
      if (orig && orig.set) {
        orig.set.call(this, value);
      }
    },
  });
};

export default hookInputSetter;
