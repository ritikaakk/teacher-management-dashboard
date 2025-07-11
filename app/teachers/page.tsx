'use client';
import { useEffect, useState } from 'react';

interface Teacher {
  name: string;
  subject: string;
  address: string;
  salary: string;
  email: string;
  phone: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('teachers');
    if (stored) {
      setTeachers(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">👩‍🏫 All Teachers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {teachers.length === 0 ? (
          <p>No teachers added yet.</p>
        ) : (
          teachers.map((t, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded shadow-md border border-purple-300"
            >
              <h2 className="text-xl font-bold text-pink-600">{t.name}</h2>
              <p className="text-gray-700">📘 Subject: {t.subject}</p>
              <p className="text-gray-700">🏠 Address: {t.address}</p>
              <p className="text-gray-700">💰 Salary: {t.salary}</p>
              <p className="text-gray-700">✉️ Email: {t.email}</p>
              <p className="text-gray-700">📞 Phone: {t.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
