const hookSegment = () => {
  if (window.analytics) {
    const origIdentify = window.analytics.identify.bind(window.analytics);
    window.analytics.identify = (...args: any[]) => {
      const userId = args[0];
      // Ignore anonymous users
      if (typeof userId === "string") {
        const traits = typeof args[1] === "object" ? args[1] : {};
        // Rename name to displayName
        const { name: displayName, ...rest } = traits;
        window.Cohere.track(userId, { displayName, ...rest });
      }
      origIdentify(...args);
    };
  }
};

export default hookSegment;
