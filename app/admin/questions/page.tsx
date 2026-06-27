"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

type Question = {
  id: string;
  question: string;
  difficulty: string;
  category: {
    name: string;
  };
};

export default function QuestionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    difficulty: "EASY",
    categoryId: "",
  });

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();

    setCategories(data);

    if (data.length > 0) {
      setForm((prev) => ({
        ...prev,
        categoryId: data[0].id,
      }));
    }
  }

  async function fetchQuestions() {
    const res = await fetch("/api/questions");
    const data = await res.json();

    setQuestions(data);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Question Created");

      setForm({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        difficulty: "EASY",
        categoryId: categories[0]?.id || "",
      });

      fetchQuestions();
    } else {
      alert("Failed");
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Questions
      </h1>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded mb-8"
      >
        <input
          placeholder="Question"
          value={form.question}
          onChange={(e) =>
            setForm({
              ...form,
              question: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Option A"
          value={form.optionA}
          onChange={(e) =>
            setForm({
              ...form,
              optionA: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Option B"
          value={form.optionB}
          onChange={(e) =>
            setForm({
              ...form,
              optionB: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Option C"
          value={form.optionC}
          onChange={(e) =>
            setForm({
              ...form,
              optionC: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Option D"
          value={form.optionD}
          onChange={(e) =>
            setForm({
              ...form,
              optionD: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Correct Answer"
          value={form.correctAnswer}
          onChange={(e) =>
            setForm({
              ...form,
              correctAnswer: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        />

        <select
          value={form.difficulty}
          onChange={(e) =>
            setForm({
              ...form,
              difficulty: e.target.value,
            })
          }
          className="w-full border p-2 mb-2"
        >
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>

        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId: e.target.value,
            })
          }
          className="w-full border p-2 mb-4"
        >
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Create Question
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">
          Existing Questions
        </h2>

        {questions.map((q) => (
          <div
            key={q.id}
            className="border p-4 mb-3 rounded"
          >
            <h3 className="font-bold">
              {q.question}
            </h3>

            <p>
              Category: {q.category.name}
            </p>

            <p>
              Difficulty: {q.difficulty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}