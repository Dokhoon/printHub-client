import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cards.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import logo from "../assets/logo.png";
import flowers from "../assets/flowers.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import BASE_URL from "../../api";



export default function CardManagement() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCardData, setEditCardData] = useState({});
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch all cards
  const fetchCards = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cards`);
      const data = await res.json();
      setCards(data);

      const uniqueCategories = [...new Set(data.map((c) => c.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cards");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filteredCards =
    category === "all" ? cards : cards.filter((c) => c.category === category);

  // Save card (add/update)
  const saveCard = async () => {
    const newErrors = {};

    // Title validation
    if (!editCardData.title || editCardData.title.trim() === "") {
      newErrors.title = "Title is required";
    } else {
      const titleExists = cards.some(
        (c) =>
          c.title?.toLowerCase() === editCardData.title.trim().toLowerCase() &&
          c._id !== editCardData._id
      );
      if (titleExists) newErrors.title = "Title already exists";
    }

    // Price validation
    if (!editCardData.price || isNaN(editCardData.price)) {
      newErrors.price = "Enter a valid price";
    } else if (parseFloat(editCardData.price) <= 0) {
      newErrors.price = "Price must be greater than zero";
    }

    // Stock validation
    if (
      editCardData.stock === "" ||
      editCardData.stock === undefined ||
      isNaN(editCardData.stock)
    ) {
      newErrors.stock = "Stock must be a number";
    } else if (parseInt(editCardData.stock) <= 0) {
      newErrors.stock = "Stock must be greater than zero";
    }

    // Category validation
if (!editCardData.category || editCardData.category.trim() === "") {
  newErrors.category = "Category is required";
} else if (isAddingCategory) {
  // Only check for duplicates if adding a completely new category
  const categoryExists = categories.some(
    (cat) => cat?.toLowerCase() === editCardData.category.trim().toLowerCase()
  );
  if (categoryExists) {
    // Don't throw an error if we're editing a card with the same category
    if (editCardData._id) {
      // editing: allow existing category
    } else {
      // adding new card with new category name that already exists
      newErrors.category = "Category already exists";
    }
  }
}


    // Image URL validation
    if (!editCardData.imageUrl || editCardData.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const fixedData = {
      ...editCardData,
      price: parseFloat(editCardData.price),
      stock: parseInt(editCardData.stock),
      description: editCardData.description || "", 
    };

    try {
      if (editCardData._id) {
        await fetch(`${BASE_URL}/api/cards/${editCardData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fixedData),
        });
        toast.success("Card updated successfully!");
      } else {
        await fetch(`${BASE_URL}/api/cards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fixedData),
        });
        toast.success("Card added successfully!");
      }

      setModalOpen(false);
      setEditCardData({});
      fetchCards();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save card");
    }
  };

  // Delete card
  const deleteCard = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await fetch(`${BASE_URL}/api/cards/${id}`, { method: "DELETE" });
        toast.success("Card deleted successfully!");
        fetchCards();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete card");
      }
    }
  };

  return (
    <div className="cards-body">
      <ToastContainer position="top-center" />

      
      <header className="cards-header">
        <img src={logo} className="cards-logo" alt="logo" />
        <nav>
          <span style={{ cursor: "pointer", marginRight: "15px" }} onClick={() => navigate("/admin")}>
            Home
          </span>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Log Out
          </span>
        </nav>
      </header>

      
      <div className="cards-content">
        <div className="cards-page">
          <div className="cards-header-row">
            <h2 className="cards-title">Cards</h2>

            <select
              className="filter-dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Cards</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Button
              color="success"
              onClick={() => {
                setEditCardData({});
                setModalOpen(true);
              }}
            >
              Add New Card
            </Button>
          </div>

          <div className="card-row">
            {filteredCards.map((card) => (
              <div key={card._id} className="card-box">
                <h3>{card.title}</h3>
                <img src={card.imageUrl} className="card-image" alt={card.title} />
                <p className="stock-text">
                  Stock: {card.stock > 0 ? card.stock : "Out of stock"}
                </p>
                <p className="price-text">{card.price} OMR</p>

                <div className="admin-actions" style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                  
                  <div
                    style={{
                      cursor: "pointer",
                      color: "#0d6efd",
                      fontSize: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "50%",
                    }}
                    title="Edit Card"
                    onClick={() => {
                      setEditCardData(card);
                      setModalOpen(true);
                    }}
                  >
                    <FaRegEdit />
                  </div>

                  
                  <div
                    style={{
                      cursor: "pointer",
                      color: "#dc3545",
                      fontSize: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      borderRadius: "50%",
                    }}
                    title="Delete Card"
                    onClick={() => deleteCard(card._id)}
                  >
                    <MdDeleteOutline />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="side-img">
          <img src={flowers} alt="flowers" />
        </div>
      </div>

      
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          {editCardData._id ? "Edit Card" : "Add New Card"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={editCardData.title || ""}
              onChange={(e) => setEditCardData({ ...editCardData, title: e.target.value })}
            />
            {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              value={editCardData.description || ""}
              onChange={(e) =>
                setEditCardData({ ...editCardData, description: e.target.value })
              }
            />
            {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
          </FormGroup>


          <FormGroup>
            <Label>Category</Label>
            <Input
              type="select"
              value={isAddingCategory ? "new" : editCardData.category || ""}
              onChange={(e) => {
                if (e.target.value === "new") {
                  setIsAddingCategory(true);
                  setEditCardData({ ...editCardData, category: "" });
                } else {
                  setIsAddingCategory(false);
                  setEditCardData({ ...editCardData, category: e.target.value });
                }
              }}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="new">+ Add New Category</option>
            </Input>

            {isAddingCategory && (
              <Input
                type="text"
                placeholder="Enter new category"
                className="mt-2"
                value={editCardData.category || ""}
                onChange={(e) =>
                  setEditCardData({ ...editCardData, category: e.target.value })
                }
              />
            )}
            {errors.category && <div style={{ color: "red" }}>{errors.category}</div>}
          </FormGroup>

          <FormGroup>
            <Label>Price</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={editCardData.price ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d{0,3}$/.test(value) || value === "") {
                  setEditCardData({ ...editCardData, price: value });
                }
              }}
            />
            {errors.price && <div style={{ color: "red" }}>{errors.price}</div>}
          </FormGroup>

          <FormGroup>
            <Label>Stock</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={editCardData.stock ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9]*$/.test(value)) {
                  setEditCardData({ ...editCardData, stock: value });
                }
              }}
            />
            {errors.stock && <div style={{ color: "red" }}>{errors.stock}</div>}
          </FormGroup>

          <FormGroup>
            <Label>Image URL</Label>
            <Input
              type="text"
              value={editCardData.imageUrl || ""}
              onChange={(e) => setEditCardData({ ...editCardData, imageUrl: e.target.value })}
            />
            {errors.imageUrl && <div style={{ color: "red" }}>{errors.imageUrl}</div>}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveCard}>
            {editCardData._id ? "Update Card" : "Add Card"}
          </Button>
          <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
