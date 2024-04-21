import axios from "axios";

class BackendRequest {
    static API_LINK = import.meta.env.VITE_API_LINK;

    /**
     * Uses axios to fetch all orientations data from a specific API endpoint asynchronously.
     *
     * @returns Return a promise that resolves to the result
     * of the axios GET request to the specified API endpoint for orientations.
     */
    static async fetchAllOrientations()
    {
        try
        {
            return await axios.get(BackendRequest.API_LINK + "api/orientation/");
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch all tags data from a specified API endpoint asynchronously.
     *
     * @returns Return a promise that resolves to the result of the
     * axios GET request to the API endpoint for fetching all tags.
     */
    static async fetchAllTags()
    {
        try
        {
            return await axios.get(`${(BackendRequest.API_LINK)}api/tag/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch a tag data by its ID from a specified API endpoint asynchronously.
     *
     * @param id - The `id` parameter is used to specify the unique
     * identifier of the tag that you want to fetch from the backend API.
     * @returns Return a promise that resolves to the result of the
     * axios GET request to the specified tag ID endpoint.
     */
    static async fetchTagById(id)
    {
        try
        {
            return await axios.get(`${(BackendRequest.API_LINK)}api/tag/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch all bachelors data from a specified API endpoint asynchronously
     * and sorts it based on the ID in descending order.
     *
     * @returns Return a sorted array of bachelor data fetched
     * from the API endpoint. The data is sorted based on the `id` property in
     * descending order.
     */
    static async fetchAllBachelors()
    {
        try
        {
            const res = await axios.get(`${(BackendRequest.API_LINK)}api/bachelor/`);
            return res.data.sort((a, b) => b.id - a.id);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async fetchAllBachelorsFromStudentById(id)
    {
        try
        {
            return await axios.get(`${(this.API_LINK)}api/student/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch a bachelor data by its ID from a specified API endpoint asynchronously.
     *
     * @param id - The `id` parameter function is used to specify the unique
     * identifier of the bachelor program that you want to fetch from the backend API.
     * @returns Return the data of a bachelor from the backend API.
     */
    static async fetchBachelorById(id)
    {
        try {
            const response = await axios.get(`${BackendRequest.API_LINK}api/bachelor/${id}/`);
            const bachelorData = response.data;

            // Get bachelor items
            bachelorData.tagsItems = [];
            for (const tagId of bachelorData.tags) {
                const tags = await BackendRequest.fetchTagById(tagId);
                bachelorData.tagsItems.push(tags.data);
            }

            // Get bachelor teacher name
            bachelorData.teacherName = await BackendRequest.getTeacherName(bachelorData.teacher);

            return bachelorData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch all teachers data from a specified API endpoint asynchronously.
     *
     * @returns Return a promise that resolves to the result of the axios GET request to
     * the specified API endpoint for fetching all teachers.
     */
    static async fetchAllTeachers()
    {
        try
        {
            return await axios.get(BackendRequest.API_LINK + "api/teacher/");
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to fetch a teacher data by its ID from a specified API endpoint asynchronously.
     *
     * @param id - The `id` parameter is used to specify the unique identifier of the teacher
     * whose information you want to fetch from the backend API.
     * @returns The `fetchTeacherById` function is returning a promise that resolves to the result of
     * the axios GET request to the specified API endpoint for fetching a teacher by their ID.
     */
    static async fetchTeacherById(id)
    {
        try
        {
            return await axios.get(`${BackendRequest.API_LINK}api/teacher/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Fetch a teacher's data by ID and returns their full name asynchronously.
     *
     * @param id - The `id` parameter is used to specify the unique
     * identifier of the teacher whose name we want to retrieve.
     * @returns The `getTeacherName` function is returning the full name of a teacher based on the
     * provided `id`. It fetches the teacher data using the `BackendRequest.fetchTeacherById` method
     * and then concatenates the first name and last name to form the full name of the teacher.
     */
    static async getTeacherName(id)
    {
        const res = await BackendRequest.fetchTeacherById(id);
        return res.data.first_name + " " + res.data.last_name;
    }

    /**
     * Uses axios to send a POST request to a specified API endpoint to create a new bachelor record asynchronously.
     *
     * @param data - The `data` parameter is the information that you want to send in the POST
     * request to the specified API endpoint.
     * @returns The `createBachelor` function is returning a promise that resolves to the result of the
     * POST request made using axios to the specified API endpoint for creating a bachelor record.
     */
    static async createBachelor(data)
    {
        try
        {
            return await axios.post(BackendRequest.API_LINK + "api/bachelor/", data);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async addBachelorToStudentSelection(idStudent, idBachelor)
    {
        try
        {
            return await axios.post(`${(BackendRequest.API_LINK)}api/student/${idStudent}/add_bachelor/`,
            {
              bachelor_id: idBachelor,
            });
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    static async removeBachelorToStudentSelection(idStudent, idBachelor)
    {
        try
        {
            return await axios.delete(`${(BackendRequest.API_LINK)}api/student/${idStudent}/remove_bachelor/`, {
                data:
                    {
                        bachelor_id: idBachelor
                    }
            });
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to send a PUT request to a specific API endpoint to update a bachelor record
     *
     * @param id - The `id` parameter is the identifier of the bachelor record that you want to update.
     * It is used to specify which bachelor record should be updated in the database.
     * @param data - The `data` parameter is the information that you want to update for a bachelor record.
     * This data will be sent in the request body when making a PUT
     * @returns Return the result of the axios put request to the
     * specified API endpoint for updating a bachelor record with the given `id`.
     */
    static async updateBachelor(id, data)
    {
        try
        {
            return await axios.put(BackendRequest.API_LINK + "api/bachelor/" + id + "/", data);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }

    /**
     * Uses axios to send a DELETE request to a specific API endpoint for
     * deleting a bachelor record by ID.
     *
     * @param id - The `id` parameter is the unique identifier of the
     * bachelor record that you want to delete from the backend server.
     * @returns Return the result of the axios delete request to the
     * specified API endpoint for deleting a bachelor record with the given `id`.
     */
    static async deleteBachelor(id)
    {
        try
        {
            return await axios.delete(`${(BackendRequest.API_LINK)}api/bachelor/${id}/`);
        }
        catch (error)
        {
            console.log(error);
            throw error;
        }
    }
}

export default BackendRequest;