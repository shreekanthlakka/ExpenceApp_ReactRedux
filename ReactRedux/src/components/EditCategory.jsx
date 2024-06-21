import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    resetEditCategory,
    startUpdateCategory,
} from "../actions/categoryActions";
import toast from "react-hot-toast";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function EditCategory({ setEdit }) {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const selectedId = useSelector(
        (state) => state.category.selectedCategoryId
    );
    const { isUpdating } = useSelector((state) => state.category.status);

    const selectedCategoryDetails = useSelector((state) =>
        state.category.categories.find((ele) => ele._id === selectedId)
    );

    function handleCancelClick() {
        setEdit(false);
        dispatch(resetEditCategory());
    }

    function handleSubmit(e) {
        e.preventDefault();
        const updatedForm = {
            categoryname: category,
        };
        dispatch(
            startUpdateCategory(selectedId, updatedForm, () => {
                toast.success("Category updated successfully");
                setEdit(false);
            })
        );
    }
    useEffect(() => {
        if (selectedId) {
            setCategory(selectedCategoryDetails.categoryname);
        }
    }, [selectedId]);
    return (
        <Form onSubmit={handleSubmit}>
            <TextField
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button variant="contained" onClick={handleCancelClick}>
                Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isUpdating}>
                Update Category
            </Button>
        </Form>
    );
}

export default EditCategory;
