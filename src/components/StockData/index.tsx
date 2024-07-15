import { useState } from "react";

interface StockDataProps {
  timeSeries: Record<string, any>;
  metaData:  Record<string, any>;
  companyName: string;
}

export function StockData({ timeSeries, metaData, companyName}: StockDataProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const dates = Object.keys(timeSeries);
  const symbol = metaData['2. Symbol'];
  const lastRefreshed = metaData['3. Last Refreshed'];
  const timeZone = metaData['5. Time Zone'];


  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Stock Data of {companyName} with symbol {symbol}</h2>
      <div>
        <p>Last Update: {lastRefreshed}</p>
        <p>TimeZone: {timeZone}</p>
      </div>
      <div className="mb-2 mt-2" id="accordion-open" data-accordion="open">
        <h2 id="accordion-open-heading-1">
          <button type="button" onClick={() => setOpenMenu(!openMenu)} className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
            <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg> Understanding Stock Data</span>
            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
          <div id="accordion-open-body-1" className={openMenu ? "" : "hidden"} aria-labelledby="accordion-open-heading-1">
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Date:</strong> The specific day the data was recorded.</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Open:</strong> The price of the stock when trading began for the day (in USD).</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>High:</strong> The highest price the stock reached during the trading day (in USD).</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Low:</strong> The lowest price the stock reached during the trading day (in USD).</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Close:</strong> The price of the stock when trading ended for the day (in USD).</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400"><strong>Volume:</strong> The number of shares traded during the day.</p>
            </div>
          </div>
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
