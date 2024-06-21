import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { startAddCategory } from "../actions/categoryActions";
import toast from "react-hot-toast";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function AddCategory() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const { isAdding } = useSelector((state) => state.category.status);

    function handleSubmit(e) {
        e.preventDefault();

        dispatch(
            startAddCategory({ categoryname: category }, () => {
                toast.success("Category added successfully");
                setCategory("");
            })
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button variant="contained" type="submit" disabled={isAdding}>
                Add Category
            </Button>
        </Form>
    );
}

export default AddCategory;
