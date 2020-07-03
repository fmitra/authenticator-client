// Minimal definitions to use https://github.com/neocotic/qrious
declare module 'qrious' {
  interface Props {
    value: string;
    size: number;
  }

  class Qrious {
    constructor(props: Props): void;
    toDataURL(value?: string): string;
  }

  module Qrious { }

  export = Qrious;
}
