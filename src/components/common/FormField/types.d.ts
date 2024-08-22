export interface IRenderInputProps {
  labelName: string;
  type: 'text' | 'password' | 'number'; // Add other valid types here
  name: string;
  containerClass?: string;
  inputClass?: string;
  errorClass?: string;
}
