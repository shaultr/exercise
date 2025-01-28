import styles from './style.module.scss';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { FaRegCircleXmark } from "react-icons/fa6";

export default function TableRow({ post }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const fetchComments = async () => {
        console.log('Fetching comments...');
        try {
            const response = await fetch(`http://localhost:8000/comments/get-comments-by-postId?postId=${post.id}`);
            const data = await response.json();
            setComments(data);
            setIsPopupOpen(true); 
            } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const toggleBody = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td
                            className={`${styles['post-body']} ${isExpanded ? styles['full-body'] : ''}`}
                            onClick={toggleBody}
                        >
                            {post.body}
                        </td>
                        <td>
                        <FaRegCircleXmark onClick={fetchComments}/>

                        </td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

            <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
                <div className={styles.popupContent}>
                    <h2>Comments</h2>
                    {
                        comments.length > 0 ?
                        comments.map((comment) => (
                            <p key={comment.id}>{comment.body}</p>
                        )) :
                        <p>No comments available</p>
                    }
                </div>
            </Popup>
        </div>
    );
}
