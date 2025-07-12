'use client';
import { useState } from 'react';

export default function Home() {
  const [teachers, setTeachers] = useState([
    {
      name: 'Priya Sharma',
      subject: 'Mathematics',
      address: '123 Rose Lane, Delhi',
      salary: '₹50,000',
      email: 'priya.sharma@example.com',
      phone: '9876543210',
    },
    {
      name: 'Rohan Mehta',
      subject: 'Science',
      address: '456 Lotus Avenue, Mumbai',
      salary: '₹48,000',
      email: 'rohan.mehta@example.com',
      phone: '9123456780',
    },
  ]);

  const [form, setForm] = useState({
    name: '',
    subject: '',
    address: '',
    salary: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [activities, setActivities] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState([
    { name: 'Priya Sharma', percent: 98 },
    { name: 'Rohan Mehta', percent: 95 },
  ]);
  const [menuOpen, setMenuOpen] = useState(false);

  const addActivity = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivities((prev) => [`${text} - ${timestamp}`, ...prev]);
  };

  const handleSubmit = () => {
    const { name, subject, address, salary, email, phone } = form;
    if (!name || !subject || !address || !salary || !email || !phone) {
      setError('Please fill all fields');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (editingIndex !== null) {
      const updated = [...teachers];
      updated[editingIndex] = { ...form };
      const updatedFeedbacks = [...feedbacks];
      updatedFeedbacks[editingIndex].name = name;
      setTeachers(updated);
      setFeedbacks(updatedFeedbacks);
      addActivity(`Updated teacher: ${name}`);
      setEditingIndex(null);
    } else {
      setTeachers([...teachers, { ...form }]);
      setFeedbacks([...feedbacks, { name, percent: 0 }]);
      addActivity(`Added new teacher: ${name}`);
    }

    setForm({
      name: '',
      subject: '',
      address: '',
      salary: '',
      email: '',
      phone: '',
    });
  };

  const handleEdit = (index: number) => {
    const teacher = teachers[index];
    setForm(teacher);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const removed = teachers[index].name;
    setTeachers(teachers.filter((_, i) => i !== index));
    setFeedbacks(feedbacks.filter((_, i) => i !== index));
    addActivity(`Deleted teacher: ${removed}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-black bg-gradient-to-b from-pink-100 to-pink-200">
      {/* Sidebar */}
      <div className="md:w-64 w-full bg-gradient-to-b from-purple-700 to-pink-600 text-white md:min-h-screen">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-purple-400">
          <div className="text-2xl font-bold">📊 Dashboard</div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
        <nav
          className={`flex-col gap-2 px-4 pb-4 text-lg md:flex ${
            menuOpen ? 'flex' : 'hidden'
          } md:block`}
        >
          {[
            { tab: 'home', icon: '🏠', label: 'Home' },
            { tab: 'teachers', icon: '👩‍🏫', label: 'Teachers' },
            { tab: 'payments', icon: '💳', label: 'Payments' },
            { tab: 'reports', icon: '📈', label: 'Reports' },
            { tab: 'settings', icon: '⚙️', label: 'Settings' },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false); // close menu on mobile
              }}
              className={`text-left px-4 py-2 rounded hover:bg-purple-500 w-full ${
                activeTab === tab ? 'bg-white text-purple-800 font-bold' : ''
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {activeTab === 'home' && (
          <>
            <h1 className="text-3xl font-bold text-purple-800 mb-1">
              👥 Home Dashboard
            </h1>
            <p className="text-gray-600 mb-6">
              Modern UI | Add, Manage, and View Teacher Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-sm text-gray-600">📚 Total Teachers</p>
                <h2 className="text-2xl font-bold">{teachers.length}</h2>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-sm text-gray-600">📦 Active Courses</p>
                <h2 className="text-2xl font-bold">12</h2>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="text-sm text-gray-600">💳 Pending Payments</p>
                <h2 className="text-2xl font-bold">3</h2>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-2">
                🏆 Top Performing Teachers
              </h3>
              <ul className="list-disc ml-6 text-black">
                <li>Ms. Priya Sharma – 98% Student Feedback</li>
                <li>Mr. Rohan Mehta – 95% Student Feedback</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">🗣️ Teacher Feedback</h3>
              {feedbacks.map((f, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{f.name}</span>
                    <span>{f.percent}%</span>
                  </div>
                  <div className="bg-gray-200 h-3 rounded">
                    <div
                      className="bg-green-500 h-3 rounded"
                      style={{ width: `${f.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-2">📌 Recent Activities</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {activities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>

            <footer className="text-center mt-10 text-sm text-gray-500">
              © 2025 Teacher Dashboard. All rights reserved.
            </footer>
          </>
        )}

        {activeTab === 'teachers' && (
          <>
            <h1 className="text-2xl font-bold text-purple-800 mb-4">
              👩‍🏫 Teachers
            </h1>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {['name', 'subject', 'address', 'salary', 'email', 'phone'].map(
                  (field) => (
                    <input
                      key={field}
                      className="border border-gray-300 rounded p-2 placeholder-black text-black"
                      placeholder={`Enter ${field}`}
                      value={form[field as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  )
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
              >
                {editingIndex !== null ? 'Update' : '+ Add Teacher'}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Teacher List</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {teachers.map((t, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-pink-100 to-white p-4 rounded-lg shadow relative"
                  >
                    <div className="absolute top-2 right-2 flex gap-3 text-sm">
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                    <h3 className="text-lg font-bold text-pink-600 capitalize">
                      {t.name}
                    </h3>
                    <p>📘 Subject: {t.subject}</p>
                    <p>🏠 Address: {t.address}</p>
                    <p>💰 Salary: {t.salary}</p>
                    <p>✉️ Email: {t.email}</p>
                    <p>📞 Phone: {t.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {['payments', 'reports', 'settings'].includes(activeTab) && (
          <div className="text-center text-xl font-semibold text-gray-600 mt-20">
            This section is under development: <span className="capitalize">{activeTab}</span>
          </div>
        )}
      </div>
    </div>
  );
}
