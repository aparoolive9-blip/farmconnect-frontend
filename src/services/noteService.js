import api from "./api";

export const noteService = {
  getMyNotes: () => api.get("/notes/my-notes"),
  createNote: (data) => api.post("/notes", data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`)
};
