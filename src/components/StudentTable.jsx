import { Edit2, Trash2 } from "lucide-react";

const StudentTable = ({ title, students, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {students.length === 0 ? (
        <p className="text-gray-400">No records found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="text-gray-400 text-sm uppercase">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Marks</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-gray-700">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.rollNo}</td>
                  <td className="px-4 py-3">{s.marks}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      s.status === "Pass"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {s.status}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => onEdit(s)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(s.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
