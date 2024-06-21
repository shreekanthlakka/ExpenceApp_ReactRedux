import { useEffect, useState } from "react";
import { useExpence } from "../contexts/expenceContext";
import styled from "styled-components";
import AddExpence from "./AddExpences";

const Table = styled.table`
    border: 2px solid black;
`;

const Tr = styled.tr`
    border: 1px solid black;
`;

const Td = styled.td`
    border: 1px solid black;
    text-align: center;
    padding: 10px;
`;

const Th = styled.th`
    border: 1px solid black;
    text-align: center;
    padding: 10px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function Expences() {
    return (
        <div>
            <AddExpence />
            <ListingExpences />
        </div>
    );
}

function ListingExpences() {
    const { expences, deleteAnExpence, getAnExpence } = useExpence();
    const [edit, setEdit] = useState(false);

    return (
        <div>
            <h2>Listing Expenses -{expences?.length}</h2>
            {expences?.length > 0 && !edit && (
                <Table>
                    <thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Amount</Th>
                            <Th>Category</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {expences.map((expence) => (
                            <Tr key={expence._id}>
                                <Td>
                                    {/* 2024-02-27T18:19:09.000Z	 */}
                                    {expence.date
                                        .split("T")[0]
                                        .split("-")
                                        .reverse()
                                        .join("/")}
                                </Td>
                                <Td>{expence.amount}</Td>
                                <Td>{expence.categoryId?.categoryname}</Td>
                                <Td>
                                    <button
                                        onClick={() => {
                                            setEdit((e) => !e);
                                            getAnExpence(expence._id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteAnExpence(expence._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {edit && <EditForm setEdit={setEdit} />}
        </div>
    );
}

function EditForm({ setEdit }) {
    const { updateAnExpence, selectedExpence } = useExpence();

    const [date, setDate] = useState(new Date());

    function handleSubmit(e) {
        e.preventDefault();
        const amount = e.target["amount"].value;
        const description = e.target["description"].value;
        const newObj = {
            amount,
            description,
            date,
        };

        updateAnExpence(selectedExpence._id, newObj);
        setEdit((prev) => !prev);
        // e.target["amount"].value = "";
        // e.target["description"].value = "";
        // setDate(new Date());
    }
    return (
        <>
            <StyledForm onSubmit={handleSubmit}>
                {/* <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={date}
                    onChange={(e) => setDate(e)}
                    id="datepicker"
                    placeholderText="select date ..."
                /> */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="select date ..."
                />
                <input
                    defaultValue={selectedExpence?.amount}
                    name="amount"
                    type="text"
                    placeholder="Enter Amount..."
                />
                <textarea
                    defaultValue={selectedExpence?.description}
                    name="description"
                    placeholder="Description..."
                />
                <button type="submit">Save</button>
                <button onClick={() => setEdit((prev) => !prev)}>Close</button>
            </StyledForm>
        </>
    );
}

export default Expences;
