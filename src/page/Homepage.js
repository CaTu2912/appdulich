import React, { useState,useEffect  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/main.css";
import Modal from "react-modal";
import Navbar from "../compment/navbar"; 
import HaLong from "../assets/img/halong.jpg";
import PhuQuoc from "../assets/img/phuquoc.jpg";
import DaNang from "../assets/img/danang.jpg";
import CmImg from "../assets/img/camau.jpg";
import CnImg from "../assets/img/chonoiCT.jpg";
import DbImg from "../assets/img/dienbien.jpg";
import HgImg from "../assets/img/hagiang.jpg";
import HpImg from "../assets/img/haiphog.jpg";
import CbImg from "../assets/img/caobang.jpg";

const destinations = [
    { img: HaLong, title: "Vịnh Hạ Long", price: 150, rating: 4.8 },
    { img: PhuQuoc, title: "Phú Quốc", price: 200, rating: 4.7 },
    { img: DaNang, title: "Đà Nẵng", price: 180, rating: 4.6 },
];
const blogs = [
    {
        imgSrc: HaLong,
        title: "Kinh nghiệm du lịch Vịnh Hạ Long",
        date: "15 Feb 2025",
        description: "Hướng dẫn chi tiết về chuyến đi khám phá kỳ quan thiên nhiên thế giới.",
    },
    {
        imgSrc: PhuQuoc,
        title: "Top địa điểm không thể bỏ lỡ ở Phú Quốc",
        date: "10 Feb 2025",
        description: "Các địa danh nổi bật ở Phú Quốc mà bạn nhất định phải ghé thăm.",
    },
];

const services = [
    { icon: "bi bi-truck", title: "Hỗ trợ di chuyển", description: "Dịch vụ đưa đón tận nơi." },
    { icon: "bi bi-shield-check", title: "Bảo hiểm du lịch", description: "An toàn trong suốt chuyến đi." },
    { icon: "bi bi-star", title: "Khách sạn cao cấp", description: "Hệ thống khách sạn chất lượng." },
];

const App = () => {
    const [likes, setLikes] = useState({});
const [bookmarks, setBookmarks] = useState({});
const [comments, setComments] = useState({});
const [commentsList, setCommentsList] = useState({});
const [posts, setPosts] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [postToDelete, setPostToDelete] = useState(null);

// Mở modal khi nhấn xóa
const openModal = (index) => {
    setPostToDelete(index);
    setIsModalOpen(true);
};

// Đóng modal
const closeModal = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
};


useEffect(() => {
    // Lấy bài viết từ localStorage khi trang chủ tải lại
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
}, []);
const handleDelete = () => {
    if (postToDelete !== null) {
        const updatedPosts = posts.filter((_, index) => index !== postToDelete);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

        // Xóa trạng thái của bài viết đã bị xóa
        setLikes(prev => {
            const newLikes = { ...prev };
            delete newLikes[postToDelete];
            return newLikes;
        });

        setBookmarks(prev => {
            const newBookmarks = { ...prev };
            delete newBookmarks[postToDelete];
            return newBookmarks;
        });

        setCommentsList(prev => {
            const newCommentsList = { ...prev };
            delete newCommentsList[postToDelete];
            return newCommentsList;
        });
    }
    closeModal();
};

Modal.setAppElement("#root"); // Định nghĩa vùng ảnh hưởng của modal

// Xử lý Like
const handleLike = (index) => {
    setLikes((prev) => ({ ...prev, [index]: !prev[index] }));
};

// Xử lý Bookmark
const handleBookmark = (index) => {
    setBookmarks((prev) => ({ ...prev, [index]: !prev[index] }));
};
useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
}, [likes]);

useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}, [bookmarks]);

// Xử lý nhập bình luận
const handleCommentChange = (e, index) => {
    setComments((prev) => ({ ...prev, [index]: e.target.value }));
};

// Xử lý gửi bình luận
const handleCommentSubmit = (index) => {
    if (!comments[index]) return;

    setCommentsList((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), comments[index]],
    }));

    setComments((prev) => ({ ...prev, [index]: "" })); // Xóa input sau khi gửi
};

    const images = [CmImg, CbImg, CnImg, DbImg, HgImg, HpImg];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
      

    return (
        <div>
            <Navbar />
            
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div className="slider-item" key={index}>
                    <img src={img} alt="slider" />
                    </div>
                ))}
                </Slider>

                <section className="destination-container">
         <h2>Điểm Đến Hấp Dẫn</h2>
    <div className="destination-grid">
        {destinations.map((place, index) => (
            <div className="destination-card" key={index}>
                <img src={place.img} alt={place.title} />
                <div className="card-content">
                    <h3>{place.title}</h3>
                    <p>Giá: ${place.price} / người</p>
                    <p>⭐ {place.rating}</p>

                    <button className="btn-like" onClick={() => handleLike(index)}>
                        {likes[index] ? "💖 Đã thích" : "🤍 Thích"}
                    </button>

                    <button className="btn-bookmark" onClick={() => handleBookmark(index)}>
                        {bookmarks[index] ? "📌 Đã lưu vào danh sách" : "🔖 Lưu địa điểm"}
                    </button>


                    {/* Bình luận */}
                    <div className="comments-section">
                        <input
                            type="text"
                            placeholder="Nhập bình luận..."
                            value={comments[index] || ""}
                            onChange={(e) => handleCommentChange(e, index)}
                        />
                        <button className="btn-comment" onClick={() => handleCommentSubmit(index)}>💬 Gửi bình luận</button>
                        </div>

                    {/* Hiển thị danh sách bình luận */}
                    <ul>
                        {commentsList[index]?.map((comment, idx) => (
                            <li key={idx}>{comment}</li>
                        ))}
                    </ul>
                </div>
            </div>
                ))}
            </div>
        </section>
        <div>
            <h2>📰 Bài Viết Mới</h2>
            <div className="post-container">
                {posts.length === 0 ? (
                    <p>Chưa có bài viết nào.</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="post-card">
                            <p>{post.content}</p>
                            {post.images.length > 0 && (
                                <div className="post-images">
                                    {post.images.map((img, i) => (
                                        <img key={i} src={img} alt="Bài viết" className="post-image" />
                                    ))}
                                </div>
                            )}
                            {post.location && <p>📍 {post.location}</p>}
                            {post.mood && <p>😊 {post.mood}</p>}
                            <p>{post.date}</p>

                            {/* Nút xóa bài viết */}
                            <button onClick={() => openModal(index)} className="delete-button">
                                🗑 Xóa
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Modal xác nhận xóa */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
                <h3>Bạn có chắc chắn muốn xóa bài viết này?</h3>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="confirm-btn">Xóa</button>
                    <button onClick={closeModal} className="cancel-btn">Hủy</button>
                </div>
            </Modal>
        </div>
            <section className="blog-container">
    <h2>Cẩm Nang Du Lịch</h2>
    <div className="blog-grid">
        {blogs.map((blog, index) => (
            <div className="blog-card" key={index}>
                <img src={blog.imgSrc} alt={blog.title} />
                <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-date">{blog.date}</p>
                    <p>{blog.description}</p>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        ))}
    </div>
</section>

<section className="services-container">
    <h2>Dịch Vụ Chúng Tôi</h2>
    <div className="services-grid">
        {services.map((service, index) => (
            <div className="service-card" key={index}>
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
        ))}
    </div>
</section>
        </div>
    );
};

export default App;
