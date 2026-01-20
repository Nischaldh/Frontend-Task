import StudentTable from "./components/StudentTable";
import Statistics from "./components/Statistics";
import StudentModal from "./components/StudentModal";

import useStudents from "./hooks/useStudent.jsx";

const App = () => {
  const {
    students,
    showModal,
    editingStudent,
    saveStudent,
    removeStudent,
    setShowModal,
    setEditingStudent,
  } = useStudents();

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const res = await getStudents();
  //       const studentsWithStatus = res.data.students.map((s) => ({
  //         ...s,
  //         status: s.marks >= 40 ? "Pass" : "Fail",
  //       }));
  //       setStudents(studentsWithStatus);
  //     } catch (err) {
  //       toast.error("Failed to load students");
  //       console.log(err);
  //     }
  //   };

  //   fetchStudents();
  // }, []);
  const maleStudents = students.filter((s) => s.gender === "Male");
  const femaleStudents = students.filter((s) => s.gender === "Female");

  // const handleSaveStudent = async (data) => {
  //   if (editingStudent) {
  //     const res = await updateStudent(editingStudent.id, data);
  //     const updatedStudent = {
  //       ...res.data.student,
  //       status: res.data.student.marks >= 40 ? "Pass" : "Fail",
  //     };

  //     setStudents((prev) =>
  //       prev.map((s) => (s.id === editingStudent.id ? updatedStudent : s)),
  //     );
  //     toast.success("Student updated successfully");
  //   } else {
  //     const res = await postStudent(data);

  //     setStudents((prev) => [...prev, res.data]);
  //     toast.success("Student added successfully");
  //   }

  //   setEditingStudent(null);
  //   setShowModal(false);
  // };

  // const handleDelete = (id) => {
  //   toast((t) => (
  //     <div className="flex gap-3">
  //       <span>Delete this student?</span>
  //       <button
  //         className="text-red-400"
  //         onClick={async () => {
  //           await deleteStudent(id);
  //           setStudents((prev) => prev.filter((s) => s.id !== id));
  //           toast.dismiss(t.id);
  //           toast.success("Student deleted");
  //         }}
  //       >
  //         Yes
  //       </button>
  //     </div>
  //   ));
  // };

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
              onDelete={removeStudent}
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
              onDelete={removeStudent}
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
        onSave={saveStudent}
        student={editingStudent}
        students={students}
      />
    </main>
  );
};

export default App;
