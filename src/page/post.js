import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/CreatePost.css";
import Navbar from "../compment/navbar"; 

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [images, setImages] = useState([]);
  const [mood, setMood] = useState("");  
  const [location, setLocation] = useState(""); // Ô nhập địa điểm
  const [suggestions, setSuggestions] = useState([]); // Gợi ý địa điểm
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const fileInputRef = useRef(null); // Tạo tham chiếu đến input file

  // Khởi tạo bản đồ khi component mount
  useEffect(() => {
    const mapElement = document.getElementById("map");

    if (!mapElement) {
      console.error("Không tìm thấy thẻ <div id='map'>");
      return;
    }

    if (!mapRef.current) {
      console.log("Khởi tạo bản đồ...");
      mapRef.current = L.map("map").setView([21.0285, 105.8542], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      console.log("Xóa bản đồ...");
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Tìm kiếm địa điểm khi nhập vào ô tìm kiếm
  const handleSearch = async () => {
    if (!location) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      const data = await response.json();
      setSuggestions(data); // Cập nhật danh sách gợi ý
    } catch (error) {
      console.error("Lỗi khi tìm kiếm địa điểm:", error);
    }
  };

  // Xử lý khi người dùng chọn một địa điểm từ danh sách gợi ý
  const handleSelectLocation = (lat, lon, displayName) => {
    setLocation(displayName);
    setSuggestions([]); // Ẩn danh sách gợi ý

    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 13);
      
      // Xóa marker cũ nếu có
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Thêm marker mới
      markerRef.current = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(displayName)
        .openPopup();
    }
  };

  // Xử lý khi chọn ảnh
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  // Kích hoạt input file khi click vào ảnh
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = () => {
    if (!content.trim()) {
        alert("Vui lòng nhập nội dung bài viết!");
        return;
    }

    const newPost = {
        content,
        visibility,
        images,
        location,
        mood,
        date: new Date().toLocaleString(),
    };
    // Lấy danh sách bài viết cũ từ localStorage
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

    // Thêm bài viết mới vào danh sách và lưu lại
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    // Hiển thị thông báo
    if (window.confirm("🎉 Bài viết đã được đăng thành công! Nhấn OK để quay về trang chủ.")) {
      navigate("/"); // Chuyển hướng về trang chủ
  }

    // Reset form
    setContent("");
    setVisibility("public");
    setImages([]);
    setLocation("");
    setMood("");
};
  

  return (
    <div>
      <Navbar />  
      <div className="post-container">
        <h2>Tạo bài viết</h2>
        <textarea 
          placeholder="Bạn đang nghĩ gì?" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Công khai</option>
          <option value="friends">Bạn bè</option>
          <option value="private">Chỉ mình tôi</option>
        </select>

        {/* Ẩn input file nhưng vẫn kích hoạt khi bấm vào ảnh */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* Hiển thị danh sách ảnh đã chọn */}
        <div className="image-preview">
          {images.map((src, index) => (
            <div key={index} className="image-container">
              <img src={src} alt={`Ảnh ${index + 1}`} className="preview-image" />
            </div>
          ))}

          {/* Ảnh "Thêm ảnh" - Khi bấm vào sẽ mở chọn file */}
          <div className="image-container add-image-container" onClick={handleImageClick}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
              alt="Thêm ảnh"
              className="add-image"
            />
          </div>
        </div>

        {/* Ô nhập địa điểm */}
        <div>
          <label>Check-in địa điểm: </label>
          <input
            type="text"
            placeholder="Nhập địa điểm hoặc chọn trên bản đồ"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
            <button className="btn-search-location" onClick={handleSearch}>
            Tìm kiếm
            </button>
          {/* Danh sách gợi ý địa điểm */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((place, index) => (
                <li key={index} onClick={() => handleSelectLocation(place.lat, place.lon, place.display_name)}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bản đồ */}
        <div id="map" className="map-container"></div>

        <input 
          type="text" 
          placeholder="Cảm xúc/hoạt động" 
          value={mood} 
          onChange={(e) => setMood(e.target.value)}
        />
        <button className="btn-submit-post" onClick={handleSubmit}>
        Đăng
        </button> 
        </div>
    </div>
  );
};

export default CreatePost;
