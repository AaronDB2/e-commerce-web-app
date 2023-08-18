import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

// Spinner component
const Spinner = () => (
  <SpinnerOverlay data-testid="spinner">
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;
