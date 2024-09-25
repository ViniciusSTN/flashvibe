export type ConfirmationCodeProps = {
  inputs: string[]
  setInputs: React.Dispatch<React.SetStateAction<string[]>>
}

export type ConfirmationCodeType = (props: ConfirmationCodeProps) => JSX.Element
