import hookInputSetter from "./hookInputs";

const disableLoad =
  typeof window === "undefined" || (window.document as any).documentMode;

if (!disableLoad) {
  hookInputSetter(HTMLInputElement.prototype, "value");
  hookInputSetter(HTMLInputElement.prototype, "checked");
  hookInputSetter(HTMLTextAreaElement.prototype, "value");
  hookInputSetter(HTMLSelectElement.prototype, "value");
  hookInputSetter(HTMLSelectElement.prototype, "selectedIndex");
}

const bridgedMethods = ["init", "identify", "stop", "showCode"] as const;

type UserAttrs = {
  displayName?: string;
  email?: string;
  [k: string]: string | undefined;
};

type CohereExports = {
  init: (apiKey: string) => void;
  identify: (userId: string, attrs?: UserAttrs) => void;
  stop: () => void;
  showCode: () => void;
};

type CohereModule = {
  invoked: boolean;
  snippet: string;
  valhook: boolean;
  methods: typeof bridgedMethods;
} & CohereExports &
  unknown[];

const noop = () => {};
const noopModule: Record<typeof bridgedMethods[number], VoidFunction> = {
  init: noop,
  identify: noop,
  stop: noop,
  showCode: noop,
};

// Create cohere or pass in previous args to init/initialize
//  if script is not created
let Cohere: CohereModule = disableLoad
  ? noopModule
  : ((window.Cohere = []) as any);
if (!disableLoad) {
  Cohere.invoked = true;
  Cohere.snippet = "0.4";
  Cohere.valhook = true;
  Cohere.methods = bridgedMethods;
  Cohere.methods.forEach((method) => {
    Cohere[method] = (...args: any[]) => {
      args.unshift(method);
      Cohere.push(args);
    };
  });

  // Create an async script element based on your key
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://static.cohere.so/main.js";

  // Insert our script before the first script element
  const first = document.getElementsByTagName("script")[0];
  if (first && first.parentNode) {
    first.parentNode.insertBefore(script, first);
  }
}

const exportedModule: CohereExports = Cohere;
export default exportedModule;
