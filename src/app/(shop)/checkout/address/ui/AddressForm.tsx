"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { Country } from "@/interfaces/country.interface";

import { useAddressStore } from "@/store";
import { deleteUserAddress, setUserAddress } from "@/actions";

import { Address } from "@/interfaces";

import { InputText } from "@/components";

type FormInputs = {
  address: string;
  address2: string;
  country: string;
  city: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  rememberAddress: boolean;
};

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address> | null;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoredAddress,
      rememberAddress: false,
    },
  });

  const router = useRouter();

  const { data: session } = useSession({
    // If user is not authenticate redirect to login
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const onSubmit = (data: FormInputs) => {
    const { rememberAddress, ...restAddress } = data;
    setAddress(restAddress);

    if (rememberAddress) {
      setUserAddress(restAddress, session!.user.id);
    } else {
      deleteUserAddress(session!.user.id);
    }

    router.push("/checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <InputText
        {...register("firstName", { required: true })}
        label="First Name"
        error={errors.firstName?.type}
        id="name"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <InputText
        {...register("lastName", { required: true })}
        label="Last Name"
        error={errors.lastName?.type}
        id="lastName"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <InputText
        {...register("address", { required: true })}
        label="Street"
        error={errors.address?.type}
        id="street"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <InputText
        {...register("address2")}
        label="Street 2 (optional)"
        error={errors.address2?.type}
        id="street-2"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <InputText
        {...register("postalCode", { required: true })}
        label="Zip"
        error={errors.postalCode?.type}
        id="zip"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <InputText
        {...register("city", { required: true })}
        label="City"
        error={errors.city?.type}
        id="city"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <div className="flex flex-col mb-2">
        <label htmlFor="country">Country</label>
        <select
          {...register("country", { required: true })}
          id="country"
          className="p-2 border rounded-md bg-gray-200"
        >
          <option value="">[ Select ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <InputText
        {...register("phone", { required: true })}
        label="Phone"
        error={errors.phone?.type}
        id="phone"
        type="text"
        className="p-2 border rounded-md bg-gray-200"
      />

      <div className="flex flex-col mb-2">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
            data-ripple-dark="true"
          >
            <input
              {...register("rememberAddress")}
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Do you want to remember your address?</span>
        </div>

        <div className="flex flex-col mb-2">
          <button
            type="submit"
            disabled={!isValid}
            className={clsx({
              "btn-primary": isValid,
              "btn-disabled": !isValid,
            })}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
