# @govtechsg/sgds-x-react-select

`@govtechsg/sgds-x-react-select` is a stylesheet package powered by [Singapore Government Design System](https://www.designsystem.gov.sg) to maintain design consistency for the `react-select` library. It provides SGDS-compliant styling for `react-select` components, ensuring a cohesive and familiar user experience within SGDS-based projects.

## Installation

Install the `@govtechsg/sgds-x-react-select` package via npm:

```sh
npm install @govtechsg/sgds-x-react-select
```

## Usage

To integrate `@govtechsg/sgds-x-react-select` styles into your React application with `react-select` components, follow these steps:

1. Import the `Select` component from `react-select` along with the required styles:

```js
import Select, { components } from 'react-select';
import '@govtechsg/sgds/css/sgds.css';
import '@govtechsg/sgds-x-react-select/dist/sgds-x-react-select.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

2. Utilize the provided Select component within your application, ensuring the use of specific class names for SGDS styles:

```js
const OPTIONS = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
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
