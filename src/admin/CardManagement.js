import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function CardManagement() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: "", description: "", price: "", imageUrl: "" });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/cards");
    setCards(res.data);
  };

  const addCard = async () => {
    await axios.post("http://localhost:5000/api/admin/cards", newCard);
    setNewCard({ title: "", description: "", price: "", imageUrl: "" });
    fetchCards();
  };

  const deleteCard = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/cards/${id}`);
    fetchCards();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Manage Cards</h2>

        <div className="mb-3">
          <input placeholder="Title" value={newCard.title} onChange={e => setNewCard({...newCard, title: e.target.value})} />
          <input placeholder="Description" value={newCard.description} onChange={e => setNewCard({...newCard, description: e.target.value})} />
          <input placeholder="Price" value={newCard.price} onChange={e => setNewCard({...newCard, price: e.target.value})} />
          <input placeholder="Image URL" value={newCard.imageUrl} onChange={e => setNewCard({...newCard, imageUrl: e.target.value})} />
          <button onClick={addCard} className="btn btn-success">Add Card</button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(card => (
              <tr key={card._id}>
                <td>{card.title}</td>
                <td>{card.description}</td>
                <td>{card.price}</td>
                <td><img src={card.imageUrl} alt={card.title} width="80" /></td>
                <td>
                  <button onClick={() => deleteCard(card._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
