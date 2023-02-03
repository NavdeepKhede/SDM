import Student from "../models/student.js";

/* GET EVERY STUDENT */
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    const formatted_students = students.map((student) => {
      return {
        id: student._id,
        name: `${student.firstName} ${
          student.middleName ? student.middleName : ""
        } ${student.lastName}`,
        Class: `${student.Class} ${student.division}`,
        rollNumber: student.rollNumber,
      };
    });

    res.status(200).json({
      status: "success",
      students: formatted_students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET A STUDENT */
export const getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    // check if a student with given ID exists
    const student = await Student.findById(id);

    if (!student) {
      // student with this ID doesn't exist
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist.",
      });
    }

    const formatted_student = {
      firstName: student.firstName,
      middleName: student.middleName ? student.middleName : "",
      lastName: student.lastName,
      Class: { key : student.Class },
      division: { key: student.division },
      rollNumber: student.rollNumber,
      addressLine1: student.addressLine1,
      addressLine2: student.addressLine2 ? student.addressLine2 : "",
      landmark: student.landmark,
      city: student.city,
      pincode: student.pincode,
    };

    res.status(200).json({
      status: "success",
      message: "Student found successfully",
      student: formatted_student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* CREATE A STUDENT */
export const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      Class,
      division,
      rollNumber,
      addressLine1,
      addressLine2,
      landmark,
      city,
      pincode,
      image,
    } = req.body;

    // check if a student with given rollNumber, class & division exists
    const existing_student = await Student.findOne({
      Class: Class,
      division: division,
      rollNumber: rollNumber,
    });

    if (existing_student) {
      // student already exists, please add anothor
      return res.status(400).json({
        status: "error",
        message: "Student's data already exists, you can add another.",
      });
    }

    const newStudent = new Student({
      ...req.body,
    });

    const savedStudent = await newStudent.save({ new: true });

    res.status(201).json({
      status: "success",
      message: "Student created successfully!",
      student: savedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* EDIT STUDENT */
export const editStudent = async (req, res) => {
  try {
    const id = req.params.id;

    // check if a student with given ID exists
    const student = await Student.findById(id);

    if (!student) {
      // student with this ID doesn't exist
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist.",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Student's data updated successfully!",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* DELETE STUDENT */
export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    // check if a student with given ID exists
    const student = await Student.findById(id);

    if (!student) {
      // student with this ID doesn't exist
      return res.status(404).json({
        status: "error",
        message: "Student doesn't exist.",
      });
    }

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Student's data deleted!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
