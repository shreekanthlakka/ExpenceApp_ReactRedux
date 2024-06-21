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
import { setExpenceId, startDeleteExpences } from "../actions/expenceActions";
import { useState } from "react";
import EditExpence from "./EditExpence";

const Container = styled.div`
    margin: 3rem;
    & button {
        margin-right: 5px;
    }
`;

function ListExpence() {
    const expences = useSelector((state) => state.expence.expences);
    const selectedId = useSelector((state) => state.expence.selectedExpenceId);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleClickDelete(id) {
        dispatch(
            startDeleteExpences(id, () => {
                toast.success("deleated sucessfully");
            })
        );
    }

    function handleEditId(id) {
        dispatch(setExpenceId(id));
        handleOpen();
    }

    return (
        <>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Category Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Amount</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Date</strong>
                                </TableCell>
                                <TableCell align="right">
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expences.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.categoryId?.categoryname}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.amount}
                                    </TableCell>
                                    {/* 2024-06-17T18:30:00.000Z */}
                                    <TableCell component="th" scope="row">
                                        {row.date
                                            .split("T")[0]
                                            .split("-")
                                            .reverse()
                                            .join("/")}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() =>
                                                handleEditId(row._id)
                                            }
                                        >
                                            edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() =>
                                                handleClickDelete(row._id)
                                            }
                                        >
                                            delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedId && (
                    <EditExpence
                        selectedId={selectedId}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                )}
            </Container>
        </>
    );
}

export default ListExpence;
