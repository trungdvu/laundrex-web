import { UilSearch } from '@iconscout/react-unicons';
import { UilFilter } from '@iconscout/react-unicons';

export default function RecentBookings() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Recent Booking</h3>
        <div className="flex items-center justify-center gap-3">
          <button className="btn-icon h-10 w-10">
            <UilSearch />
          </button>
          <button className="btn-icon h-10 w-10">
            <UilFilter />
          </button>
        </div>
      </div>

      <div className="relative mt-3 overflow-x-auto">
        <table className="w-full text-left text-neutral-500">
          <thead className="bg-neutral-100 uppercase">
            <tr>
              <th scope="col" className="px-6 py-4 font-normal">
                Customer
              </th>
              <th scope="col" className="px-6 py-4 font-normal">
                Booking id
              </th>
              <th scope="col" className="px-6 py-4 font-normal">
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-normal">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-black">
              <td scope="row" className="whitespace-nowrap px-6 py-4">
                Trung Dinh Vu
              </td>
              <td className="px-6 py-4">512356</td>
              <td className="px-6 py-4">09-04-2024</td>
              <td className="px-6 py-4">$10</td>
            </tr>
            <tr className="border-b text-black">
              <td scope="row" className="whitespace-nowrap px-6 py-4">
                Thu Hang 831
              </td>
              <td className="px-6 py-4">512357</td>
              <td className="px-6 py-4">09-04-2024</td>
              <td className="px-6 py-4">$6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
