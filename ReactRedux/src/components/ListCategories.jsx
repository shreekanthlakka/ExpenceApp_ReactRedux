import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import styled from "styled-components";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditCategory from "./EditCategory";
import { editCategory, startDeleteCategory } from "../actions/categoryActions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Container = styled.div`
    margin: 3rem;
    & button {
        margin-right: 5px;
    }
`;

function ListCategories() {
    const categories = useSelector((state) => state.category.categories);
    const { isDeleting } = useSelector((state) => state.category.status);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    function handleDelete(id) {
        dispatch(
            startDeleteCategory(id, () => {
                toast.success("deleated sucessfully");
            })
        );
    }

    const handleOpen = () => setEdit(true);
    const handleClose = () => setEdit(false);

    function handleEditClick(id) {
        dispatch(editCategory(id));
        handleOpen();
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Category Name</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.categoryname}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleEditClick(row._id)}
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleDelete(row._id)}
                                        disabled={isDeleting}
                                    >
                                        delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={edit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditCategory edit={edit} setEdit={setEdit} />
                </Box>
            </Modal>
        </Container>
    );
}

export default ListCategories;
