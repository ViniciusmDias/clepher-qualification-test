import React, { useState } from 'react';
import { apiUrl } from '../../services/api';

interface SearchProps {
  onSelect: (symbol: string) => void;
  setCompanyName: (companyName: string) => void;
}

export function Search({ onSelect, setCompanyName }: SearchProps){
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    
    if (event.target.value.length > 0) {
      try {
        const response = await fetch(`${apiUrl}/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
        const result = await response.json();
        if (result.bestMatches) {
          setResults(result.bestMatches);
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a company..."
        className="border p-2 w-full"
      />
        {results.length > 0 && (
          <ul className="border mt-2">
            {results.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  onSelect(item['1. symbol']); 
                  setCompanyName(item['2. name']);
                  setResults([])
                }}
              >
                {item['2. name']} ({item['1. symbol']})
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default Search;
