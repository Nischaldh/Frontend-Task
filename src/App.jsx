import { useState } from "react";
import toast from "react-hot-toast";
import { STUDENTS } from "./constants/students";
import StudentTable from "./components/StudentTable";
import Statistics from "./components/Statistics";
import StudentModal from "./components/StudentModal";

const App = () => {
  const [students, setStudents] = useState(STUDENTS);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const maleStudents = students.filter((s) => s.gender === "Male");
  const femaleStudents = students.filter((s) => s.gender === "Female");

  const handleSaveStudent = (data) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => 
          s.id === editingStudent.id ? { ...data, id: s.id } : s
        ),
      );
      toast.success("Student updated successfully");
    } else {
      setStudents((prev) => [...prev, { ...data, id: Date.now() }]);
      toast.success("Student added successfully");
    }

    setEditingStudent(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3">
        <span>Delete this student?</span>
        <button
          className="text-red-400"
          onClick={() => {
            setStudents((prev) => prev.filter((s) => s.id !== id));
            toast.dismiss(t.id);
            toast.success("Student deleted");
          }}
        >
          Yes
        </button>
      </div>
    ));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Student Management System</h1>

          <button
            onClick={() => {
              setEditingStudent(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            + Add Student
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <StudentTable
              title="Male Students"
              students={maleStudents}
              onEdit={(s) => {
                setEditingStudent(s);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          </div>
          <Statistics title="Male Statistics" students={maleStudents} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <StudentTable
              title="Female Students"
              students={femaleStudents}
              onEdit={(s) => {
                setEditingStudent(s);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          </div>
          <Statistics title="Female Statistics" students={femaleStudents} />
        </div>
      </div>

      <StudentModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        student={editingStudent}
        students={students}
      />
    </main>
  );
};

export default App;
