const hookInputSetter = <T extends HTMLElement>(target: T, key: string) => {
  const orig = Object.getOwnPropertyDescriptor(target, key);
  Object.defineProperty(target, key, {
    set(value) {
      // IE11 - https://stackoverflow.com/a/49071358
      let event: Event;
      if (typeof Event === "function") {
        event = new Event("coherevalueupdate");
      } else {
        event = document.createEvent("Event");
        event.initEvent("coherevalueupdate", false, false);
      }
      (this as T).dispatchEvent(event);
      if (orig && orig.set) {
        orig.set.call(this, value);
      }
    },
  });
};

export default hookInputSetter;
