import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>

      <div className="space-y-4">
        <Link
          href="/admin/categories"
          className="block border p-4"
        >
          Manage Categories
        </Link>

        <Link
          href="/admin/questions"
          className="block border p-4"
        >
          Manage Questions
        </Link>
      </div>
    </div>
  );
}