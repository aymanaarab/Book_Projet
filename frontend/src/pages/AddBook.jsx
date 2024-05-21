import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const config = {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'

            },}
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.post('http://127.0.0.1:3000/api/add-book', formData, config);

      if (response.status === 202) {
        console.log('Book added successfully:', response.data.data);
        // Reset the form fields
        setTitle('');
        setAuthor('');
        setDescription('');
        setImage(null);
      } else {
        console.error('Error adding book:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
        Title:
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
        Author:
      </label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
        Description:
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
        Image:
      </label>
      <input
        type="file"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
    >
      Add Book
    </button>
  </form>
  
  );
};

export default AddBook;