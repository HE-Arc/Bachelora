/**
 * Part on the documentation of the methodes generate with the Mintlify Doc Writer extension
 */

import axios from "axios";
import Notification from "@/notifications/notifications.js";
import router from "@/router/index.js";
import Cookie from "@/cookies/cookies.js";
import {eventBus} from "@/eventBus.js";

class BackendRequest {
    static API_LINK = import.meta.env.VITE_API_LINK;

    /**
     * Uses axios to fetch all orientations data from a specific API endpoint asynchronously.
     * Display a failure notification if there is an error.
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
            Notification.failed("Impossible de récupérer la liste des orientations");
            throw error;
        }
    }

    /**
     * Uses axios to fetch all tags data from a specified API endpoint asynchronously.
     * Display a failure notification if there is an error.
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
            Notification.failed("Impossible de récupérer la liste des tags");
            throw error;
        }
    }

    /**
     * Uses axios to fetch a tag data by its ID from a specified API endpoint asynchronously.
     * Display a failure notification if there is an error.
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
            Notification.failed("Impossible de récupérer le tag");
            throw error;
        }
    }

    /**
     * Uses axios to fetch all bachelors data from a specified API endpoint asynchronously
     * and sorts it based on the ID in descending order.
     * Display a failure notification if there is an error.
     *
     * @returns Return a sorted array of bachelor data fetched
     * from the API endpoint. The data is sorted based on the `id` property in
     * descending order.
     */
    static async fetchAllBachelors()
    {
        try
        {
            await this.checkToken();
            const res = await axios.get(`${(BackendRequest.API_LINK)}api/bachelor/`);
            return res.data.sort((a, b) => b.id - a.id);
        }
        catch (error)
        {
            Notification.failed("Impossible de récupérer la liste des bachelors");
            throw error;
        }
    }

    /**
     * Uses axios to fetches all bachelor data for a student with a specific ID from a specified API endpoint asynchronously
     * Display a failure notification if there is an error.
     *
     * @param id - The `id` parameter is used to specify the student ID for
     * which you want to fetch all the bachelor information.
     * @returns Return the result of the GET request to the API endpoint for fetching all bachelors
     * associated with a student ID.
     */
    static async fetchAllBachelorsFromStudentById(id)
    {
        try
        {
            await this.checkToken();
            return await axios.get(`${(this.API_LINK)}api/student/${id}/`);
        }
        catch (error)
        {
            Notification.failed("Impossible de récupérer votre sélection de bachelors");
            throw error;
        }
    }

    /**
     * Uses axios to fetch a bachelor data by its ID from a specified API endpoint asynchronously.
     * Display a failure notification if there is an error.
     *
     * @param id - The `id` parameter function is used to specify the unique
     * identifier of the bachelor program that you want to fetch from the backend API.
     * @returns Return the data of a bachelor from the backend API.
     */
    static async fetchBachelorById(id)
    {
        try {
            await this.checkToken();
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
            Notification.failed("Impossible de récupérer les informations sur le bachelor");
            throw error;
        }
    }

    /**
     * Uses axios to fetch all teachers data from a specified API endpoint asynchronously.
     * Display a failure notification if there is an error.
     *
     * @returns Return a promise that resolves to the result of the axios GET request to
     * the specified API endpoint for fetching all teachers.
     */
    static async fetchAllTeachers()
    {
        try
        {
            await this.checkToken();
            return await axios.get(BackendRequest.API_LINK + "api/teacher/");
        }
        catch (error)
        {
            Notification.failed("Impossible de récupérer la liste des enseignants");
            throw error;
        }
    }

    /**
     * Uses axios to fetch a teacher data by its ID from a specified API endpoint asynchronously.
     * Display a failure notification if there is an error.
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
            await this.checkToken();
            return await axios.get(`${BackendRequest.API_LINK}api/teacher/${id}/`);
        }
        catch (error)
        {
            Notification.failed("Impossible de récupérer l'enseignant'");
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
        await this.checkToken();
        const res = await BackendRequest.fetchTeacherById(id);
        return res.data.first_name + " " + res.data.last_name;
    }

    /**
     * Uses axios to send a POST request to a specified API endpoint to create a new bachelor record asynchronously.
     * Displays a success notification if successful, or a failure notification if there is an error.
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
            await this.checkToken();
            const res = await axios.post(BackendRequest.API_LINK + "api/bachelor/", data);

            Notification.success("Nouveau bachelor ajouté !");

            return res;
        }
        catch (error)
        {
            Notification.failed("Impossible d'ajouter le nouveau bachelor");
            throw error;
        }
    }

    /**
     * Uses axios to add a bachelor to a student's selection and displays a success notification if
     * successful, or a failure notification if there is an error.
     *
     * @param idStudent - The `idStudent` parameter represents the unique identifier of the student to
     * whom the bachelor program will be added in their selection.
     * @param idBachelor - The `idBachelor` parameter is the unique identifier of the bachelor program
     * that you want to add to the student's selection.
     * @param nameBachelor - The `nameBachelor` parameter represents the name of the bachelor that is
     * being added to the student's selection.
     * @returns Return the result of the axios POST request, which is stored in the `res` variable.
     */
    static async addBachelorToStudentSelection(idStudent, idBachelor, nameBachelor)
    {
        try
        {
            await this.checkToken();
            const res = await axios.post(`${(BackendRequest.API_LINK)}api/student/${idStudent}/add_bachelor/`,
            {
              bachelor_id: idBachelor,
            });

            Notification.success(`Bachelor <em>${nameBachelor}</em> ajouté dans votre sélection de bachelor !`);

            return res;
        }
        catch (error)
        {
            Notification.failed("Impossible d'ajouter le bachelor à votre sélection");
            throw error;
        }
    }

    /**
     * Uses axios to remove a bachelor from a student's selection by sending a DELETE
     * request to the backend API.
     * Display a success notification if successful, or a failure notification if there is an error.
     *
     * @param idStudent - The `idStudent` parameter is the unique identifier of the student whose
     * bachelor selection needs to be updated.
     * @param idBachelor - The `idBachelor` parameter represents the unique identifier of the bachelor
     * program that you want to remove from the student's selection.
     * @param nameBachelor - The `nameBachelor` parameter represents the name of the bachelor that is
     * being removed from the student's selection.
     * It is used to display a notification message informing the user that the specified bachelor has
     * been successfully removed from their selection.
     * @returns Return the response object `res` after making a DELETE request to the specified API endpoint.
     */
    static async removeBachelorToStudentSelection(idStudent, idBachelor, nameBachelor)
    {
        try
        {
            await this.checkToken();
            const res = await axios.delete(`${(BackendRequest.API_LINK)}api/student/${idStudent}/remove_bachelor/`, {
                data:
                    {
                        bachelor_id: idBachelor
                    }
            });

            Notification.success(`Bachelor <em>${nameBachelor}</em> retiré dans votre sélection de bachelor !`);

            eventBus.emit("update-chosen-bachelor", { message: "Mettre à jour la vue des bachelors sélectionnée."});

            return res;
        }
        catch (error)
        {
            Notification.failed("Impossible de retirer le bachelor de votre sélection");
            throw error;
        }
    }

    /**
     * Uses axios to send a PUT request to a specific API endpoint to update a bachelor record.
     * Displays a success notification if successful, or a failure notification if there is an error.
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
            await this.checkToken();
            const res = await axios.put(BackendRequest.API_LINK + "api/bachelor/" + id + "/", data);

            Notification.success("Modification effectuée avec succès !");

            return res;
        }
        catch (error)
        {
            Notification.failed("Impossible de modifier le bachelor");
            throw error;
        }
    }

    /**
     * Uses axios to send a DELETE request to a specific API endpoint for deleting a bachelor record by ID.
     * Display a success notification if successful, or a failure notification if there is an error.
     *
     * @param id - The `id` parameter is the unique identifier of the
     * bachelor record that you want to delete from the backend server.
     * @param nameBachelor - The `nameBachelor` corresponding to the name of the bachelor that is display on the notification
     * @returns Return the result of the axios delete request to the
     * specified API endpoint for deleting a bachelor record with the given `id`.
     */
    static async deleteBachelor(id, nameBachelor)
    {
        try
        {
            await this.checkToken();
            const res = await axios.delete(`${(BackendRequest.API_LINK)}api/bachelor/${id}/`);

            Notification.success(`Le bachelor <em>${nameBachelor}</em> a bien été supprimé !`);

            return res;
        }
        catch (error)
        {
            Notification.failed("Impossible de supprimer le bachelor");
            throw error;
        }
    }

    /**
     * Uses axios to send a POST request to a signup API endpoint asynchronously, handles
     * successful registration by creating a cookie and displaying a success notification, and handles
     * errors by displaying appropriate notifications and emitting an event to update access.
     * 
     * @param data - The `data` parameter is the information needed to
     * register a user, such as their username, email, password, etc. This data will be sent in the
     * POST request to the API endpoint for user registration.
     * @returns Return a boolean value. If the registration is successful,
     * it returns `true`. If there is an error during registration, it returns `false`.
     */
    static async register(data)
    {
        try
        {
            const res = await axios.post(`${this.API_LINK}api/signup`, data);
            Cookie.create(res.data.user, res.data.token);
            Notification.success("Inscription réussie !");

            eventBus.emit("update-access", { message: "Mettre à jour le drawer" });

            return true;
        }
        catch (error)
        {
            if(error.response.status === 400)
            {
                for(const e in error.response.data)
                {
                    Notification.warning(error.response.data[e]);
                }
            }
            else
            {
                Notification.failed("Inscription impossible");
                throw error;
            }

            return false;
        }
    }

    /**
     * Uses axios to send a POSTT request to login user login to a specific API endpoint asynchronously, 
     * handling different response statuses, and performing actions based on the response.
     * 
     * @param data - The `data` parameter contains the user credentials
     * needed for logging in, such as the username and password.
     */
    static async login(data)
    {
        try
        {
            const res = await axios.post(`${this.API_LINK}api/login`, data);
            Cookie.create(res.data.user, res.data.token);
            Notification.success("Connexion réussie !");

            eventBus.emit("update-access", { message: "Mettre à jour le drawer" });

            router.push({name: 'bachelors'});
        }
        catch (error)
        {
            if(error.response.status === 404)
            {
                Notification.warning("Utilisateur introuvable.");
            }
            else if(error.response.status === 401)
            {
                Notification.warning("Nom d'utilisateur ou mot de passe incorrect.");
            }
            else
            {
                Notification.failed("Connexion impossible");
            }
        }
    }

    /**
     * Uses axios to checks the validity of a token by making a request to a specific API endpoint asynchronously
     * and handles the response accordingly.
     * 
     * @returns Return `true` if the token is valid and the request to the API endpoint. It returns `false` if
     * there is an error, specifically if the response status is 403 (Forbidden), in which case it also
     * redirects the user to the login page with a query parameter `reconnect: true`.
     */
    static async checkToken()
    {
        try
        {
            await axios.get(`${this.API_LINK}api/test_token`, {
               headers: {
                   'Authorization': 'token ' + Cookie.getToken()
               }
            });

            return true;
        }
        catch (error)
        {
            if (error.response.status === 403)
            {
                router.push({name: "login", query: { reconnect: true }});
            }
            return false;
        }
    }
    
    /**
     * Logs the user out by deleting a cookie, displaying a success notification,
     * emitting an event to update access, and returning true if successful, otherwise displaying a
     * failure notification and returning false.
     * 
     * @returns Return a boolean value - `true` if the cookie is successfully
     * deleted and `false` if the deletion fails.
     */
    static logout()
    {
        if(Cookie.delete())
        {
            Notification.success("Déconnexion réussie !");

            eventBus.emit("update-access", { message: "Mettre à jour le drawer" });

            return true;
        }
        else
        {
            Notification.failed("Déconnexion impossible");
            return false;
        }
    }
}

export default BackendRequest;