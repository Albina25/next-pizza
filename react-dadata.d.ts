declare module 'react-dadata' {
  import * as React from 'react';

  export interface DaDataSuggestion {
    value: string;
    unrestricted_value: string;
    data: any;
  }

  export interface AddressSuggestionsProps {
    token: string;
    value?: DaDataSuggestion;
    onChange?: (suggestion: DaDataSuggestion) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  }

  export class AddressSuggestions extends React.Component<AddressSuggestionsProps> {}
}