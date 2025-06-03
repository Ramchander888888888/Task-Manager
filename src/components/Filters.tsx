import React from "react";
type FilterType = 'all' | 'completed' | 'pending'

interface FilterProps {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({filter, setFilter}) =>{
return (
    <div className="filter-buttons">
        {['all','completed','pending'].map((f) =>(
            <button
            key={f}
            onClick={() => setFilter(f as FilterType)}
            disabled={filter === f}
            style={{marginRight: '10px'}}
            >
                {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
       ) )}
    </div>
)
}

export default Filter;