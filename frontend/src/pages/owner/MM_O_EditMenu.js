import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/O_Header';
import { FaEdit, FaPlus } from 'react-icons/fa';
import styles from '../../styles/owner/menu.module.css';

// troll image
import mariIdolru from '../../assets/mari_idolru.jpg';
import cute from '../../assets/hail.png';

const MmOEditMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    categoryid: 1,
    image: '',
  });
  const [data, setData] = useState([]); // State to hold fetched data
  const itemsPerPage = 8;
  const maxPageButtons = 3;

  // Fetch items from tthe backend server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/IM/get-items');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Search function to filter items
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Get filtered and sorted items
  const getFilteredAndSortedItems = () => {
    let filteredItems = [...data];
    
    // Apply search filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryid.toString().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption) {
      filteredItems.sort((a, b) => {
        switch (sortOption) {
          case 'price-asc':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price-desc':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filteredItems;
  };

  // Sort function
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Edit function
  const handleEdit = (index) => {
    const itemIndex = (currentPage - 1) * itemsPerPage + index;
    setCurrentItem({ ...data[itemIndex], index: itemIndex });
    setFileName('');
    setIsModalOpen(true);
  };

  // Form submit handler for editing items
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!currentItem.name || !currentItem.price) {
        alert('Please fill in all required fields');
        return;
      }

      // Validate price format
      if (isNaN(parseFloat(currentItem.price))) {
        alert('Price must be a valid number');
        return;
      }

      const updatedData = [...data];

      // Set default image if none selected
      if (!currentItem.image) {
        currentItem.image = mariIdolru;
      }

      updatedData[currentItem.index] = currentItem;

      // Update local state
      setData(updatedData);
      
      // TODO: Update backend
      // await axios.put(`/api/items/${currentItem.id}`, currentItem);

      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  // Delete handler
  const handleDelete = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this item?')) {
        return;
      }

      // Delete from backend
      await axios.delete(`http://localhost:8080/IM/delete-item/${currentItem.id}`);

      const updatedData = data.filter((_, index) => index !== currentItem.index);
      
      // Update local state
      setData(updatedData);

      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  // Add new item handler
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const price = parseFloat(newItem.price);
      if (isNaN(price) || price <= 0) {
        alert('Price must be a valid positive number');
        return;
      }
  
      let imageUrl = 'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/03/14/5cacc3ac-4547-11e9-b5dc-9921d5eb8a6d_image_hires_110410.jpg';
  
      if (newItem.image) {
        const formData = new FormData();
        formData.append('file', newItem.image);
        formData.append('upload_preset', 'chizza');
  
        const uploadResponse = await axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        imageUrl = uploadResponse.data.url;
      }
  
      const itemData = {
        name: newItem.name,
        price: price,
        categoryid: parseInt(newItem.categoryid),
        image: imageUrl,
      };
  
      const response = await axios.post('http://localhost:8080/IM/create-item', itemData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
  
      const newItemWithId = {
        ...itemData,
        id: response.data.id,
      };
  
      setData([...data, newItemWithId]);
  
      setNewItem({
        name: '',
        price: '',
        categoryid: 1,
        image: '',
      });
      setFileName('');
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item: Image may be too large. Please try a smaller image file.');
    }
  };

  // Page change handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate items for current page
  const getCurrentPageItems = () => {
    const filteredAndSortedItems = getFilteredAndSortedItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, endIndex);
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
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add item changes
  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setNewItem((prevItem) => ({
        ...prevItem,
        image: file,
      }));
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the range of page buttons to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button 
            className={styles.addItemButton}
            onClick={() => setIsAddModalOpen(true)}
          >
            <FaPlus /> Add Item
          </button>
          <div className={styles.sortContainer}>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        <div className={styles.grid}>
          {getCurrentPageItems().map((item, index) => (
            <div key={index} className={styles.card}>
              <img src={item.image} alt={item.name} className={styles.imagePlaceholder} />
              <p className={styles.itemText}>{item.name}</p>
              <p className={styles.itemPrice}>${item.price}</p>
              <button className={styles.editButton} onClick={() => handleEdit(index)}>
                <FaEdit /> Edit
              </button>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for editing item details */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <img src={currentItem.image} alt={currentItem.name} />
            <h2>Edit Item</h2>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentItem.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className={styles.formGroupMenuRow}>
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
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="categoryid">Category</label>
                <select
                  id="categoryid"
                  name="categoryid"
                  value={currentItem.categoryid}
                  onChange={handleFormChange}
                  required
                >
                  <option value="1">Pizza</option>
                  <option value="2">Special</option>
                  <option value="3">Drinks</option>
                  <option value="4">Desserts</option>
                </select>
              </div>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="img">Image</label>
                <div className={styles.fileInputContainer}>
                  <label htmlFor="img" className={styles.fileInputLabel}>Choose File</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleFileChange}
                  />
                  <span className={styles.fileName}>{fileName}</span>
                </div>
              </div>
              <button type="submit" className={styles.saveButton}>Save</button>
              <button type="button" className={styles.delButton} onClick={handleDelete}>Delete</button>
              <button type="button" className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for adding new item */}
      {isAddModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Item</h2>
            <form onSubmit={handleAddItem}>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="newName">Name</label>
                <input
                  type="text"
                  id="newName"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="newPrice">Price</label>
                <input
                  type="text"
                  id="newPrice"
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({...prev, price: e.target.value}))}
                  required
                />
              </div>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="newCategoryid">Category</label>
                <select
                  id="newCategoryid"
                  value={newItem.categoryid}
                  onChange={(e) => setNewItem(prev => ({...prev, categoryid: e.target.value}))}
                  required
                >
                  <option value="1">Pizza</option>
                  <option value="2">Special</option>
                  <option value="3">Drinks</option>
                  <option value="4">Desserts</option>
                </select>
              </div>
              <div className={styles.formGroupMenuRow}>
                <label htmlFor="newImg">Image</label>
                <div className={styles.fileInputContainer}>
                  <label htmlFor="newImg" className={styles.fileInputLabel}>Choose File</label>
                  <input
                    type="file"
                    id="newImg"
                    onChange={handleAddFileChange}
                  />
                </div>
              </div>
              <span className={styles.fileName}>{fileName}</span>
              <button type="submit" className={styles.saveButton}>Add Item</button>
              <button 
                type="button" 
                className={styles.cancelButton} 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setFileName('');
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MmOEditMenu;