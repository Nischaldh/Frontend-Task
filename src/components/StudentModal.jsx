import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const StudentModal = ({ isOpen, onClose, onSave, student, students }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (student) {
      reset(student);
    } else {
      reset({
        name: "",
        rollNo: "",
        marks: "",
        gender: "Male"
      });
    }
  }, [student, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave({
      ...data,
      marks: Number(data.marks),
      status: data.marks >= 40 ? "Pass" : "Fail"
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold">
            {student ? "Edit Student" : "Add Student"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 space-y-4"
        >
          {/* Name */}
          <input
            className="w-full bg-gray-700 p-2 rounded outline-none"
            placeholder="Name"
            {...register("name", {
              required: "Name is required"
            })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}

          {/* Roll No */}
          <input
            className="w-full bg-gray-700 p-2 rounded outline-none"
            placeholder="Roll No"
            {...register("rollNo", {
              required: "Roll No is required",
              validate: (value) => {
                const duplicate = students.find(
                  (s) =>
                    s.rollNo === value &&
                    s.id !== student?.id // 👈 allow same student while editing
                );
                return duplicate
                  ? "Roll No already exists"
                  : true;
              }
            })}
          />
          {errors.rollNo && (
            <p className="text-red-400 text-sm">{errors.rollNo.message}</p>
          )}

          {/* Marks */}
          <input
            type="number"
            className="w-full bg-gray-700 p-2 rounded outline-none"
            placeholder="Marks"
            {...register("marks", {
              required: "Marks required",
              min: { value: 0, message: "Minimum is 0" },
              max: { value: 100, message: "Maximum is 100" }
            })}
          />
          {errors.marks && (
            <p className="text-red-400 text-sm">{errors.marks.message}</p>
          )}

          {/* Gender */}
          <select
            className="w-full bg-gray-700 p-2 rounded outline-none"
            {...register("gender", { required: true })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium"
          >
            {student ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
