"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

export default function QuizHome() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Select Category
      </h1>

      {categories.map((category) => (
        <div
          key={category.id}
          className="border p-4 rounded mb-3"
        >
          <h2 className="font-bold text-xl">
            {category.name}
          </h2>

          <button
            className="mt-3 bg-black text-white px-4 py-2 rounded"
            onClick={() =>
              router.push(
                `/quiz/${category.id}`
              )
            }
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
}