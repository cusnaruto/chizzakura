import React, { useState } from 'react';
import Header from '../components/O_Header';
import { FaEdit } from 'react-icons/fa';
import '../styles/menu.css';


// troll image
import mariIdolru from '../assets/mari_idolru.jpg';
import cute from '../assets/hail.png';


const MmOEditMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [fileName, setFileName] = useState('');
  const itemsPerPage = 8;
  const maxPageButtons = 3;

  // data for testing purposes, can be replaced with API data later
  const data = [
    { text: 'Hawaiian Pizza', price: '$11.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Veggie Pizza', price: '$8.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Meat Lovers Pizza', price: '$12.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Cheese Pizza', price: '$7.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Buffalo Chicken Pizza', price: '$10.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Marin Idol Arghhh', price: '$99.99', img: mariIdolru, category: 'Special' },
    { text: 'Spicy Italian Pizza', price: '$10.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Taco Pizza', price: '$12.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Cheeseburger Pizza', price: '$13.49', img: mariIdolru, category: 'Pizza' },
    { text: 'UOGHHHHH', price: '$14.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Garlic Chicken Pizza', price: '$11.99', img: mariIdolru, category: 'Pizza' },
    { text: 'BBQ Bacon Pizza', price: '$12.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Buffalo Pizza', price: '$13.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Spinach Alfredo Pizza', price: '$10.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Artichoke Pizza', price: '$11.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Truffle Pizza', price: '$14.99', img: mariIdolru, category: 'Pizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'MARIDOLLETGOOO', price: '$99.99', img: mariIdolru, category: 'NotPizza' },
    { text: 'Supreme Pizza', price: '$13.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Cute Anime Girl Pizza', price: '$9.49', img: cute, category: 'Pizza' },
    { text: 'Mushroom Pizza', price: '$8.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Sausage Pizza', price: '$9.49', img: mariIdolru, category: 'Pizza' },
    { text: 'From The Screen 💻', price: '$15.49', img: mariIdolru, category: 'NotPizza'  },
    { text: 'To The Ring 🥊', price: '$14.49', img: mariIdolru, category: 'NotPizza'  },
    { text: 'To The Pen 🖋️', price: '$11.99', img: mariIdolru, category: 'NotPizza'  },
    { text: 'To The King 👑', price: '$13.99', img: mariIdolru, category: 'NotPizza'  },
    { text: 'Pizza Margherita', price: '$8.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Pepperoni Pizza', price: '$9.99', img: mariIdolru, category: 'Pizza' },
    { text: 'BBQ Chicken Pizza', price: '$10.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Prosciutto Pizza', price: '$13.99', img: mariIdolru, category: 'Pizza' },
    { text: 'Fig and Goat Cheese Pizza', price: '$15.49', img: mariIdolru, category: 'Pizza' },
    { text: 'Lobster Pizza', price: '$19.99', img: mariIdolru, category: 'Special' }
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Search function to filter items (logic for future implementation)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sort function to sort items (logic for future implementation)
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Edit function to edit items (logic for future implementation)
  const handleEdit = (index) => {
    const itemIndex = (currentPage - 1) * itemsPerPage + index;
    setCurrentItem({ ...data[itemIndex], index: itemIndex });
    setFileName('');
    setIsModalOpen(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle item info change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  // Handle image change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem((prevItem) => ({
          ...prevItem,
          img: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle item edit info submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...data];
    updatedData[currentItem.index] = currentItem;
    // Update the data array with the new item details
    // Update the backend here
    setIsModalOpen(false);
  };

  // Handle delete item
  const handleDelete = () => {
    const updatedData = data.filter((_, index) => index !== currentItem.index);
    // Update the data array by removing the item
    // Update the backend here
    setIsModalOpen(false);
  };

  // Calculate the range of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="top-bar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="sort-container">
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        <div className="grid">
          {currentItems.map((item, index) => (
            <div key={index} className="card">
              <img src={item.img} alt="Mari Idolru" className="image-placeholder" />
              <p className="item-text">{item.text}</p>
              <p className="item-price">{item.price}</p>
              <button className="edit-button" onClick={() => handleEdit(index)}>
                <FaEdit /> Edit
              </button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
            <button
              key={page}
              className={`page-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for editing item details */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
          <img src={currentItem.img} alt={currentItem.text} />
            <h2>Edit Item</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="text">Name</label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={currentItem.text}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={currentItem.price}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={currentItem.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Special">Special</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <div className="file-input-container">
                  <label htmlFor="img" className="file-input-label">Choose File</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleFileChange}
                  />
                  <span className="file-name">{fileName}</span>
                </div>
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
              <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MmOEditMenu;