import Select, { components } from 'react-select';
import '../index.css';
import '@govtechsg/sgds/css/sgds.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const OPTIONS = [
  { value: 'chocolate', label: 'Chocolates' },
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
    <>
      {/* Single-select */}
      <Select
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        className="sgds-x-react-select-container"
        classNamePrefix="sgds-x-react-select"
        options={OPTIONS}
      />

      {/* Multi-select */}
      <Select
        isMulti
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        className="sgds-x-react-select-container"
        classNamePrefix="sgds-x-react-select"
        options={OPTIONS}
      />
    </>
  );
};

export default App;
