declare interface IMarkCustomerCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MarkCustomerCommandSetStrings' {
  const strings: IMarkCustomerCommandSetStrings;
  export = strings;
}
