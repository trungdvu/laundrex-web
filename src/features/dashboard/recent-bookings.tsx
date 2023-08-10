import IconButton from '@/components/buttons/icon-button';
import Icon from '@/components/icons/icon';

export default function RecentBookings() {
  return (
    <div>
      <div className="flex items-center justify-between border-t border-grey-dark pb-1.5 pt-3">
        <h3 className="px-4 text-base font-bold md:text-lg lg:text-xl">
          Recent Booking
        </h3>
        <div className="flex items-center justify-center gap-0.5 px-4 text-grey-main">
          <IconButton className="p-2">
            <Icon name="search" />
          </IconButton>
          <IconButton className="p-2">
            <Icon name="filter" />
          </IconButton>
        </div>
      </div>

      <div className="relative mt-1 hidden overflow-scroll overflow-x-auto whitespace-nowrap px-4 text-sm md:block lg:text-base">
        <table className="w-full rounded-2xl text-left">
          <thead className="border-b border-grey-dark">
            <tr>
              <th
                scope="col"
                className="rounded-bl-2xl rounded-tl-2xl px-4 py-3 font-bold"
              >
                Customer
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Booking
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Date
              </th>
              <th
                scope="col"
                className="rounded-br-2xl rounded-tr-2xl px-4 py-3 font-bold"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-grey-dark">
              <td scope="row" className="whitespace-nowrap px-4 py-3">
                Trung Dinh Vu
              </td>
              <td className="px-4 py-3">512356</td>
              <td className="px-4 py-3">09-04-2024</td>
              <td className="px-4 py-3">$10</td>
            </tr>
            <tr className="border-b border-grey-dark">
              <td scope="row" className="whitespace-nowrap px-4 py-3">
                Thu Hang 831
              </td>
              <td className="px-4 py-3">512357</td>
              <td className="px-4 py-3">09-04-2024</td>
              <td className="px-4 py-3">$6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
