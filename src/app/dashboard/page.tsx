import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
    return (
         <div className="min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sales Copilot Dashboard</h1>
        <UserButton />
      </header>
      <main>
        <p>Welcome to your secure dashboard. Only authenticated users can see this.</p>
      </main>
    </div>
    )
}