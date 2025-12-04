import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

const FilterBar = ({ filters, onFilterChange, onSearch, onClear, sortBy, onSortChange }) => {
  return (
    <div className="filter-bar card rounded-4 shadow-sm mb-4 p-4">
      <h6 className="fw-bold mb-3">Filtrer les messages</h6>
      
      {/* Filter Inputs */}
      <div className="row g-3 mb-3">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <input 
            type="text" 
            placeholder="Rechercher par ID" 
            className="form-control rounded-pill" 
            value={filters.id}
            onChange={(e) => onFilterChange('id', e.target.value)}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <input 
            type="text" 
            placeholder="Rechercher par nom" 
            className="form-control rounded-pill" 
            value={filters.name}
            onChange={(e) => onFilterChange('name', e.target.value)}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <input 
            type="text" 
            placeholder="Rechercher par email" 
            className="form-control rounded-pill" 
            value={filters.email}
            onChange={(e) => onFilterChange('email', e.target.value)}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="custom-select-wrapper">
            <select 
              className="form-select rounded-pill"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="lu">Lu</option>
              <option value="non lu">Non lu</option>
            </select>
            <IoChevronDown className="dropdown-icon" />
          </div>
        </div>
      </div>
      
      {/* Action Buttons and Sort */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
        <div className="d-flex gap-2 flex-wrap">
          <button 
            className="btn btn-primary rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
            onClick={onSearch}
          >
            <CiSearch size={20} />
            <span>Rechercher</span>
          </button>
          <button 
            className="btn btn-outline-secondary rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
            onClick={onClear}
          >
            <RiResetLeftLine size={20} />
            <span>Réinitialiser</span>
          </button>
        </div>
        
        {/* Sort Options */}
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold text-nowrap">Trier par:</span>
          <div className="sort-select-wrapper">
            <select 
              className="form-select rounded-pill"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="date_desc">Plus récents</option>
              <option value="date_asc">Plus anciens</option>
            </select>
            <IoChevronDown className="dropdown-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
