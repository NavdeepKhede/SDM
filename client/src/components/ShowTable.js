import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Eye, PencilSimpleLine, Trash } from "phosphor-react";
import axios from "../axios";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { UpdateManagePageTypeAndId } from "../redux/slices/app";

// Transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowTable = () => {
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [stuID, setStuID] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setStuID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    // Call the API to delete the item
    await axios
      .delete(`/student/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }) // Handle the response from backend here
      .then((res) => {
        console.log(res);
        dispatch(UpdateManagePageTypeAndId("SHOWALL", null));
        handleClose();
      })
      // Catch errors if any
      .catch((error) => {
        console.log(error);
      });
  };

  function handleView(id) {
    dispatch(UpdateManagePageTypeAndId("VIEWONE", id));
  }

  function handleEdit(id) {
    dispatch(UpdateManagePageTypeAndId("EDITONE", id));
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton onClick={() => handleView(record.id)}>
            {" "}
            <Eye size={16} />{" "}
          </IconButton>
          <IconButton onClick={() => handleEdit(record.id)}>
            {" "}
            <PencilSimpleLine size={16} />{" "}
          </IconButton>
          <IconButton onClick={() => handleOpen(record.id)}>
            {" "}
            <Trash size={16} />{" "}
          </IconButton>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    return async () => {
      await axios
        .get("/student") // Handle the response from backend here
        .then((res) => {
          setDataSource(res.data.students);
        })
        // Catch errors if any
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  return (
    <>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Header title="Manage Students" backBtn={false} />
        <Table
          sticky
          dataSource={dataSource}
          columns={columns}
          srcoll={{ y: 400 }}
        />
      </Stack>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        sx={{ p: 4 }}
      >
        <DialogTitle sx={{ mb: 3 }}>
          Are you sure you want to Delete?
        </DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="end"
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => handleDelete(stuID)}
              type="submit"
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowTable;
