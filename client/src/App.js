import styles from './style.module.scss';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';
import Choose from './components/Choose';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 4;

  const fetchPosts = async (page, sortBy = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/get-all-posts?page=${page}&limit=${postsPerPage}`
      );
      let postsData = response.data.posts;

      if (sortBy === "title-asc") {
        postsData = postsData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "title-desc") {
        postsData = postsData.sort((a, b) => b.title.localeCompare(a.title));
      }

      setPosts(postsData);
      setFilteredPosts(postsData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, sortBy);
  }, [currentPage, sortBy]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Choose
        sortBy = {sortBy}
        handleSortChange = {handleSortChange}
        searchQuery = {searchQuery}
        handleSearch = {handleSearch}
      />
 
      <TableHeader />
      {filteredPosts.map((post) => (
        <TableRow key={post.id} post={post} />
      ))}
      
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <GrFormPrevious />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
}

export default App;
