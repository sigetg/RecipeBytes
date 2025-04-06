// Type declaration for importing CSS modules in TypeScript.
// This allows you to import .module.css files and use their class names with type safety.
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Tell TypeScript how to handle imported .gif files.
declare module '*.gif' {
  const src: string;
  export default src;
}
