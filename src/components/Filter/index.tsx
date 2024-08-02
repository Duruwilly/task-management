import { FilterState } from "../../common.type";

interface FilterSelectProps {
  filterVal: FilterState;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ filterVal, onChange }) => {
  return (
    <label>
      <span>Filter:</span>
      <select value={filterVal} onChange={onChange}>
        <option value={FilterState.All}>All</option>
        <option value={FilterState.Completed}>Completed</option>
        <option value={FilterState.Incomplete}>Incomplete</option>
      </select>
    </label>
  );
};

export default FilterSelect;
