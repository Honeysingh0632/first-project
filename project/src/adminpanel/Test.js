import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImageUpdate = () => {
    const { id } = useParams(); // Get ID from URL params
    const [image, setImage] = useState(null);
   
    const [currentImage, setCurrentImage] = useState(null);
    const [data, setData] = useState([]);
   

    // Fetch the current image details when the component loads
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/addbook/single/${id}`);
                setImage(response.data.imageUrl);
                // Assuming response contains image URL
            } catch (err) {
                console.error('Error fetching image:', err); // Log Axios error
            }
        };

        fetchImage();
    }, [id]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdate = async () => {
        const formData = new FormData();
       
        formData.append('image', image);

        try {
            const res = await axios.put(`http://localhost:8000/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setCurrentImage(res.data.image.imageUrl);
        } catch (err) {
            if (err.response) {
                console.error('Server responded with error:', err.response.data); // Log server-side error
            } else if (err.request) {
                console.error('No response from server:', err.request); // Log request error
            } else {
                console.error('Other error:', err.message); // Log other errors
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:8000/api/data');
            setData(res.data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, []);
    

    return (
        <div>
            <h2>Update Image</h2>
           
            {currentImage && (
                <div>
                    <h3>Current Image:</h3>
                    <img src={`http://localhost:8000/uploads/${currentImage}`} alt="Current" style={{ width: '300px' }} />
                </div>
            )}

            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default ImageUpdate;
