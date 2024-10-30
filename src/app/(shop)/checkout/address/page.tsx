import Link from "next/link";

import { Title } from "@/components";

export default function NamePage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="lastName">LastName</label>
            <input
              id="lastName"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="street-2">Street 2 (optional)</label>
            <input
              id="street-2"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="zip">Zip</label>
            <input
              id="zip"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="country">Country</label>
            <select id="country" className="p-2 border rounded-md bg-gray-200">
              <option value="">[ Select ]</option>
              <option value="USA">United State</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex w-full sm:w-1/2 justify-center "
            >
              Next
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
