import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDispatch, useSelector } from "react-redux";
import { resetExpenceId, startUpdateExpences } from "../actions/expenceActions";
import dayjs from "dayjs";
import toast from "react-hot-toast";

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

const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const initialState = {
    amount: "",
    description: "",
    categoryId: "",
    date: "2022-04-17",
};

function EditExpence({ handleClose, open, selectedId }) {
    const expenceDetails = useSelector((state) =>
        state.expence.expences.find((ele) => ele._id === selectedId)
    );
    const [formDate, setFormData] = useState(initialState);
    const categories = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        //client side validations
        dispatch(
            startUpdateExpences(selectedId, formDate, () => {
                toast.success("updated sucessfully");
                handleClose();
            })
        );
    }

    function handleCancelClick() {
        handleClose();
        dispatch(resetExpenceId());
    }

    useEffect(() => {
        if (expenceDetails) {
            setFormData(expenceDetails);
        }
    }, [selectedId]);
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Container onSubmit={handleSubmit}>
                        {/* <TextField label="title" variant="outlined" /> */}
                        <TextField
                            label="amount"
                            variant="outlined"
                            value={formDate.amount}
                            onChange={(e) =>
                                setFormData({
                                    ...formDate,
                                    amount: +e.target.value,
                                })
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    label="select date"
                                    value={formDate.data}
                                    onChange={(val) =>
                                        setFormData({
                                            ...formDate,
                                            date: dayjs(val),
                                        })
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        <TextField
                            label="description"
                            variant="outlined"
                            value={formDate.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formDate,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Select
                            sx={{ minWidth: "15rem" }}
                            inputProps={{ "aria-label": "Without label" }}
                            displayEmpty
                            value={formDate.categoryId}
                            onChange={(e) =>
                                setFormData({
                                    ...formDate,
                                    categoryId: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">Select category</MenuItem>
                            {categories.map((ele) => (
                                <MenuItem key={ele._id} value={ele._id}>
                                    {ele.categoryname}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="contained" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Container>
                </Box>
            </Modal>
        </>
    );
}

export default EditExpence;
