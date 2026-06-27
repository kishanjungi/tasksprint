"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  description: string | null;
};

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    const res = await fetch("/api/categories");

    const data = await res.json();

    setCategories(data);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setName("");
      setDescription("");

      fetchCategories();
    } else {
      alert(
        data.message ||
          "Failed to create category"
      );
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Existing Categories
        </h2>

        {categories.map((category) => (
          <div
            key={category.id}
            className="border p-4 rounded mb-3"
          >
            <h3 className="font-bold">
              {category.name}
            </h3>

            <p>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}