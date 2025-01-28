import styles from './style.module.scss';

export default function TableHeader() {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    );
}
