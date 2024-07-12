
interface StockDataProps {
  timeSeries: Record<string, any>;
  metaData:  Record<string, any>;
  companyName: string;
}

export function StockData({ timeSeries, metaData, companyName}: StockDataProps) {
  const dates = Object.keys(timeSeries);
  const information = metaData['1. Information'];
  const symbol = metaData['2. Symbol'];
  const lastRefreshed = metaData['3. Last Refreshed'];
  const timeZone = metaData['5. Time Zone'];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Stock Data of {companyName} {symbol}</h2>
      <div>
        <p>{information}</p>
        <p>Last Update: {lastRefreshed}</p>
        <p>TimeZone: {timeZone}</p>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Open</th>
            <th className="px-4 py-2">High</th>
            <th className="px-4 py-2">Low</th>
            <th className="px-4 py-2">Close</th>
            <th className="px-4 py-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date}>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">${timeSeries[date]['1. open']}</td>
              <td className="border px-4 py-2">${timeSeries[date]['2. high']}</td>
              <td className="border px-4 py-2">${timeSeries[date]['3. low']}</td>
              <td className="border px-4 py-2">${timeSeries[date]['4. close']}</td>
              <td className="border px-4 py-2">{timeSeries[date]['5. volume']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
