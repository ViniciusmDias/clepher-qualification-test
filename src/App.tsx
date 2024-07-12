import { useState } from 'react';
import './App.css';
import { StockData } from './components/StockData'
import Search from './components/Search';

const companies = [
  { name: 'Toyota', symbol: 'TM' },
  { name: 'Volkswagen', symbol: 'VWAGY' },
  { name: 'Ford', symbol: 'F' }
];

function App() {
  const [timeSeries, setTimeSeries] = useState<Record<string, any> | null>(null);
  const [metaData, setMetaData] = useState<Record<string, any> | null>(null);
  const [companyName, setCompanyName] = useState("")

  const fetchData = async (symbol: string) => {
    console.log(symbol)
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`);
      const result = await response.json();

      setTimeSeries(result['Time Series (Daily)']);
      setMetaData(result['Meta Data'])
    } catch (error) {
      console.log(error)
    }
  };

  const handleSelect = (symbol: string) => {
    fetchData(symbol);
    setCompanyName("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Data App</h1>
      <ul className="list-disc mb-4">
        <h3 className="text-xl font-bold mb-4">Example of companies to test:</h3>
        {companies.map((company) => (
          <li key={company.symbol} className="cursor-pointer text-blue-500" 
          onClick={() => {
            fetchData(company.symbol);setCompanyName(company.name);
          }}>
            {company.name}
          </li>
        ))}
      </ul>
      <Search onSelect={handleSelect}     setCompanyName={setCompanyName}
      />
      {timeSeries && metaData && <StockData timeSeries={timeSeries} metaData={metaData} companyName={companyName} />}
    </div>
  );
}

export default App;
