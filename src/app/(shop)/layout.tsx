import { Footer, Sidebar, TopMenu } from "@/components";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col">
      <div className="h-14">
        <TopMenu />
        <Sidebar />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-0 sm:px-10">
        {children}
        <Footer />
      </div>
    </main>
  );
}
