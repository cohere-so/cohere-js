let hooked = false;

const hookSegment = () => {
  if (window.analytics && !hooked) {
    hooked = true;
    const origIdentify = window.analytics.identify.bind(window.analytics);
    window.analytics.identify = (...args: unknown[]) => {
      const userId = args[0] as string;
      // Ignore anonymous users
      if (typeof userId === "string") {
        const traits =
          args[1] && typeof args[1] === "object"
            ? (args[1] as Record<string, unknown>)
            : {};
        // Rename name to displayName
        const { name: displayName, ...rest } = traits;
        window.Cohere.identify(userId, { displayName, ...rest });
      }
      origIdentify(...args);
    };
  }
};

export default hookSegment;
