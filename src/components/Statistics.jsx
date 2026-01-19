import React from 'react'

const Statistics = ({ title, students }) => {
  const average =
    students.length === 0
      ? 0
      : (
          students.reduce((sum, s) => sum + s.marks, 0) / students.length
        ).toFixed(2);

  const passed = students.filter(s => s.status === "Pass").length;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">{title}</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Students</span>
          <span className="font-bold">{students.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Passed</span>
          <span className="text-green-400 font-bold">{passed}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Average Marks</span>
          <span className="text-blue-400 font-bold">{average}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

