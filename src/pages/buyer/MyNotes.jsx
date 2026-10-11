import { useEffect, useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import { noteService } from "../../services/noteService";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [productId, setProductId] = useState("");

  async function loadNotes() {
    try {
      const response = await noteService.getMyNotes();
      setNotes(response.data.notes || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");
    setError("");

    if (!productId || !draft.trim()) {
      setError("Select a product and enter a note before saving.");
      return;
    }

    try {
      await noteService.createNote({ product_id: productId, note_text: draft });
      setDraft("");
      setProductId("");
      setNotice("Note saved.");
      await loadNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save note.");
    }
  }

  async function handleDelete(id) {
    setNotice("");
    setError("");

    try {
      await noteService.deleteNote(id);
      setNotice("Note removed.");
      await loadNotes();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete note.");
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="section-title">My Notes</h1>
      <AlertMessage type="success" message={notice} />
      <AlertMessage type="danger" message={error} />

      <div className="action-panel mb-4">
        <h2 className="h5">Create a note</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Product ID</label>
              <input
                className="form-control"
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="e.g. 1"
                required
              />
            </div>
            <div className="col-md-8">
              <label className="form-label">Note</label>
              <textarea
                className="form-control"
                rows="3"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a reminder about a product, delivery, or quality check"
                required
              />
            </div>
          </div>
          <button className="btn btn-success mt-3" type="submit">Save note</button>
        </form>
      </div>

      <div className="table-responsive data-table">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Farmer</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No saved notes yet.</td>
              </tr>
            ) : (
              notes.map((note) => (
                <tr key={note.id}>
                  <td>{note.product_name}</td>
                  <td>{note.farmer_name}</td>
                  <td>{note.note_text}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyNotes;
