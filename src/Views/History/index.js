import React from 'react';

function SearchHistory({ searchHistory  }) {
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((searchTerm, index) => (
          <li key={index}>{searchTerm}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
