import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { useCategory } from "../contexts/categoryContexts";
import { useExpence } from "../contexts/expenceContext";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 60%;
`;

function AddExpence() {
    const { categories, getAllCategories } = useCategory();
    const { createAnExpence } = useExpence();
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState();
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit() {
        const expenceObj = {
            date,
            amount,
            categoryId,
            description,
        };
        // createExpence(expenceObj);
        createAnExpence(expenceObj);
        setAmount("");
        setDescription("");
        setDate(new Date());
    }

    useEffect(() => {
        getAllCategories();
    }, []);
    console.log("categories===>>", categories);

    return (
        <div>
            <StyledForm>
                <span>
                    <h3>Add Expences here...</h3>
                    <DatePicker
                        dateFormat={"dd/MM/yyyy"}
                        selected={date}
                        onChange={(e) => setDate(e)}
                        id="datepicker"
                        placeholderText="select date ..."
                    />
                    {/* <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        id="datepicker"
                    /> */}
                    <label htmlFor="datepicker">🗓️</label>
                </span>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    placeholder="Enter Amount..."
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.categoryname}
                        </option>
                    ))}
                </select>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                />
                <button onClick={handleSubmit} type="button">
                    Submit
                </button>
            </StyledForm>
        </div>
    );
}

export default AddExpence;
