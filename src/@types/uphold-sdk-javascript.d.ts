/**
 * This is just a simple workaround for the lack of types on the SDK module
 */

declare module '@uphold/uphold-sdk-javascript' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const foo: any;
  export = foo;
}
