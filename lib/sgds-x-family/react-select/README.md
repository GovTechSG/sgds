# React-select

This is a collection of stylesheets powered by [Singapore Government Design System](https://www.designsystem.gov.sg) to provide SGDS-compliant styling for third party packages, ensuring a cohesive and familiar user experience within SGDS-based projects. We do this to reuse libraries in the open source community and reduce maintenance overhead.

## Installation

Install the following packages via npm:

```sh
$ npm i @govtechsg/sgds bootstrap-icons react-select
```

## Usage

### React-Select

Tested against: `react-select@^5.4.0`

To integrate sgds styles into your React application with `react-select` components, follow these steps:

1. Create a css file with the following contents

```css
/** sgds-x-react-select.css */
.sgds-x-react-select-container .sgds-x-react-select__control {
  border: 1px solid #98a2b3;
}
.sgds-x-react-select-container .sgds-x-react-select__control--is-focused {
  box-shadow: none;
}
.sgds-x-react-select__menu .sgds-x-react-select__option--is-focused {
  background-color: var(--sgds-gray-200);
}
.sgds-x-react-select__menu .sgds-x-react-select__option--is-selected {
  background-color: var(--sgds-primary);
}
.sgds-x-react-select__menu .sgds-x-react-select__option:active {
  background-color: var(--sgds-gray-300);
}
.sgds-x-react-select__value-container .sgds-x-react-select__multi-value {
  background-color: var(--sgds-primary);
  color: var(--sgds-white);
}
.sgds-x-react-select__multi-value .sgds-x-react-select__multi-value__label {
  color: var(--sgds-white);
}
.sgds-x-react-select__multi-value
  .sgds-x-react-select__multi-value__remove:hover {
  background-color: var(--sgds-primary);
  color: var(--sgds-white);
}
```

2. Import the `Select` component from `react-select` along with the required styles:

```js
import Select, { components } from "react-select";
import "@govtechsg/sgds/css/sgds.css";
import "./sgds-x-react-select.css";
import "bootstrap-icons/font/bootstrap-icons.css";
```

3. Utilize the provided Select component within your application, ensuring the use of specific class names for SGDS styles:

```js
const OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="bi bi-search form-control-icon"></i>
    </components.DropdownIndicator>
  );
};

const App = () => {
  return (
    <Select
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      className="sgds-x-react-select-container"
      classNamePrefix="sgds-x-react-select"
      options={OPTIONS}
      // Other react-select props
    />
  );
};

export default App;
```

**Note:** Ensure that the `className` prop is set to `"sgds-x-react-select-container"` and `classNamePrefix` prop is set to `"sgds-x-react-select"` for your `Select` component to acquire the SGDS styling. Following these exact class names is essential to apply the SGDS styles correctly.
