
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
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2      sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className=" px-6 py-4">Date</th>
                    <th scope="col" className=" px-6 py-4">Open</th>
                    <th scope="col" className=" px-6 py-4">High</th>
                    <th scope="col" className=" px-6 py-4">Low</th>
                    <th scope="col" className=" px-6 py-4">Close</th>
                    <th scope="col" className=" px-6 py-4">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {dates.map((date) => (
                    <tr  className="border-b border-neutral-200 dark:border-white/10" key={date}>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">{date}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">${timeSeries[date]['1. open']}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">${timeSeries[date]['2. high']}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">${timeSeries[date]['3. low']}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">${timeSeries[date]['4. close']}</td>
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">{timeSeries[date]['5. volume']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
