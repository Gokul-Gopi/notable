import { invokeAxios } from "../utils/axios";

export const getUsetNotes = async (searchInput) => {
  const route =
    typeof searchInput === "string" ? `note?search=${searchInput}` : `note`;

  try {
    const response = await invokeAxios(route);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await invokeAxios("/note", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (data) => {
  const { id, ...rest } = data;
  try {
    const response = await invokeAxios(`/note/${id}`, rest, "PUT");
    return response;
  } catch (error) {
    throw error;
  }
};

export const delteNote = async (id) => {
  try {
    const response = await invokeAxios(`/note/${id}`, {}, "DELETE");
    return response;
  } catch (error) {
    throw error;
  }
};

export const pinNote = async (id) => {
  try {
    const response = await invokeAxios(`/note/pin/${id}`, {}, "PUT");
    return response;
  } catch (error) {
    throw error;
  }
};
