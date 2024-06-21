import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { startAddExpences } from "../actions/expenceActions";
import toast from "react-hot-toast";

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

function CreateExpence() {
    const categories = useSelector((state) => state.category.categories);
    const [formDate, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formDate);
        // run validations
        dispatch(
            startAddExpences(formDate, () => {
                toast.success("expence added sucessfully");
                setFormData(initialState);
            })
        );
    }
    return (
        <Container onSubmit={handleSubmit}>
            {/* <TextField label="title" variant="outlined" /> */}
            <TextField
                label="amount"
                variant="outlined"
                value={formDate.amount}
                onChange={(e) =>
                    setFormData({ ...formDate, amount: +e.target.value })
                }
            />
            {/* <input type="date" value={formDate.date} /> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                        label="select date"
                        value={formDate.data}
                        onChange={(val) =>
                            setFormData({ ...formDate, date: dayjs(val) })
                        }
                    />
                </DemoContainer>
            </LocalizationProvider>

            <TextField
                label="description"
                variant="outlined"
                value={formDate.description}
                onChange={(e) =>
                    setFormData({ ...formDate, description: e.target.value })
                }
            />
            {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
            <Select
                // labelId="demo-simple-select-label"
                // label="Select category"
                sx={{ minWidth: "15rem" }}
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
                value={formDate.categoryId}
                onChange={(e) =>
                    setFormData({ ...formDate, categoryId: e.target.value })
                }
            >
                <MenuItem value="">Select category</MenuItem>
                {categories.map((ele) => (
                    <MenuItem key={ele._id} value={ele._id}>
                        {ele.categoryname}
                    </MenuItem>
                ))}
            </Select>
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </Container>
    );
}

export default CreateExpence;
