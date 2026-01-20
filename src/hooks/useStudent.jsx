import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getStudents,
  postStudent,
  updateStudent,
  deleteStudent,
} from "../service/student.service.js";

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      const studentsWithStatus = res.data.students.map((s) => ({
        ...s,
        status: s.marks >= 40 ? "Pass" : "Fail",
      }));
      setStudents(studentsWithStatus);
    } catch (err) {
      toast.error("Failed to load students");
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchStudents();
    })();
  }, []);

  const saveStudent = async (data) => {
    if (editingStudent) {
      const res = await updateStudent(editingStudent.id, data);
      const updatedStudent = {
        ...res.data.student,
        status: res.data.student.marks >= 40 ? "Pass" : "Fail",
      };

      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? updatedStudent : s)),
      );
      toast.success("Student updated successfully");
    } else {
      const res = await postStudent(data);
      const newStudent = {
        ...res.data,
        status: res.data.marks >= 40 ? "Pass" : "Fail",
      };

      setStudents((prev) => [...prev, newStudent]);
      toast.success("Student added successfully");
    }
    fetchStudents();

    setEditingStudent(null);
    setShowModal(false);
  };

  const removeStudent = (id) => {
    toast((t) => (
      <div className="flex gap-3">
        <span>Delete this student?</span>
        <button
          className="text-red-400"
          onClick={async () => {
            await deleteStudent(id);
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

  return {
    students,
    showModal,
    editingStudent,
    saveStudent,
    removeStudent,
    setShowModal,
    setEditingStudent,
  };
};

export default useStudents;
