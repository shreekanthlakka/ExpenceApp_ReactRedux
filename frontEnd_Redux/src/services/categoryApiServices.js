const URI = "http://localhost:5000/api/v1";

const createCategoryApi = async (categoryObj) => {
    try {
        const res = await fetch(`${URI}/categories`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryObj),
        });
        if (!res.ok) throw new Error("error while fetching data");
        const data = await res.json();
        console.log(data, " <====data");
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const getAllCategoriesApi = async () => {
    try {
        const res = await fetch(`${URI}/categories`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Could not retrieve categories");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const getCategoryApi = async (id) => {
    try {
        const res = await fetch(`${URI}/categories/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error getting a the  category");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const updateACategoryApi = async (id, updatedObj) => {
    try {
        const res = await fetch(`${URI}/categories/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedObj),
        });
        if (!res.ok) throw new Error("Error updating the category");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const deleteACategoryApi = async (id) => {
    try {
        const res = await fetch(`${URI}/categories/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error deleting category");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export {
    createCategoryApi,
    getAllCategoriesApi,
    deleteACategoryApi,
    getCategoryApi,
    updateACategoryApi,
};
