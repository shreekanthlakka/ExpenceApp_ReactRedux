import { useEffect, useState } from "react";
import { useCategory } from "../contexts/categoryContexts";
import styled from "styled-components";

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

function Categories() {
    const { getAllCategories, categories, addCategory } = useCategory();
    const [category, setCategory] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (category === "") {
            return;
        }
        addCategory({ categoryname: category });
        setCategory("");
    }

    useEffect(() => {
        getAllCategories();
    }, []);
    return (
        <Container>
            <CategoryInput
                category={category}
                setCategory={setCategory}
                handleSubmit={handleSubmit}
            />
            <CategoryListing categories={categories} />
        </Container>
    );
}

function CategoryInput({ category, setCategory, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="category">Enter the category name</label>
            <br />
            <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add Category</button>
        </form>
    );
}

function CategoryListing({ categories }) {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const {
        deleteCategory,
        getSingleCategory,
        selectedCategory,
        updateCategory,
    } = useCategory();

    function handleUpdate() {
        if (!name) return;
        updateCategory(selectedCategory._id, { categoryname: name });
        setName("");
        setOpen((e) => !e);
    }

    return (
        <div>
            <h3>Category List - {categories.length}</h3>
            {categories.map((ele, i) => (
                <div key={ele._id}>
                    {i + 1}. <span>{ele.categoryname}</span>
                    <button
                        onClick={() => {
                            setOpen((e) => !e);
                            getSingleCategory(ele._id);
                        }}
                    >
                        update
                    </button>
                    <button onClick={() => deleteCategory(ele._id)}>
                        delete
                    </button>
                </div>
            ))}
            <dialog open={open}>
                <h2>Update for {selectedCategory?.categoryname}</h2>
                <input
                    type="text"
                    placeholder="new category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setOpen((e) => !e)}>Cancel</button>
            </dialog>
        </div>
    );
}

export default Categories;
