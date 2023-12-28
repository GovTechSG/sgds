# @govtechsg/sgds-x-family (Work In Progress)

`@govtechsg/sgds-x-family` is a stylesheet package powered by [Singapore Government Design System](https://www.designsystem.gov.sg) to provide SGDS-compliant styling for third party packages, ensuring a cohesive and familiar user experience within SGDS-based projects.

## Installation

`@govtechsg/sgds-x-family` is not shipped with any included CSS. Apply `@govtechsg/sgds@latest` styles by installing the module or using CDN.

Install the `@govtechsg/sgds-x-family` package via npm:

```sh
$ npm i @govtechsg/sgds-x-family @govtechsg/sgds
```

## Usage

### React-Select

To integrate `@govtechsg/sgds-x-family` styles into your React application with `react-select` components, follow these steps:

1. `@govtechsg/sgds-x-family/react-select` uses `bootstrap-icons` but does not ship with it. Install `bootstrap-icons` or use CDN.

```sh
$ npm i bootstrap-icons
```

2. Import the `Select` component from `react-select` along with the required styles:

```js
import Select, { components } from 'react-select';
import '@govtechsg/sgds/css/sgds.css';
import '@govtechsg/sgds-x-family/react-select/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

3. Utilize the provided Select component within your application, ensuring the use of specific class names for SGDS styles:

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

**This package is still work in progress and not published yet**
