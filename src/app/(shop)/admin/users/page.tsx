export const revalidate = 0;

import { Pagination, Title } from "@/components";
import { getPaginatedUsers } from "@/actions";
import { UsersTable } from "./ui/UsersTable";

export default async function AdminOrdersPage() {
  const { users = [] } = await getPaginatedUsers();

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={1} />
      </div>
    </>
  );
}
