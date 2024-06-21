const URI = "http://localhost:5000/api/v1";

const createExpenceApi = async (expencesObj) => {
    try {
        const res = await fetch(`${URI}/expences`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expencesObj),
        });
        if (!res.ok) throw new Error("error while fetching data");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const getAllExpencesApi = async () => {
    try {
        const res = await fetch(`${URI}/expences`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Could not retrieve expences");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const getExpenceApi = async (id) => {
    try {
        const res = await fetch(`${URI}/expences/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error getting a the expences");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const updateAnExpenceApi = async (id, updatedObj) => {
    try {
        const res = await fetch(`${URI}/expences/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedObj),
        });
        if (!res.ok) throw new Error("Error updating the expences");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

const deleteAnExpenceApi = async (id) => {
    try {
        const res = await fetch(`${URI}/expences/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error deleting expences");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export {
    createExpenceApi,
    getAllExpencesApi,
    getExpenceApi,
    updateAnExpenceApi,
    deleteAnExpenceApi,
};
