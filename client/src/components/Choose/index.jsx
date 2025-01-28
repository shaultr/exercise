import styles from './style.module.scss';

export default function Choose({ sortBy, handleSortChange, searchQuery, handleSearch }) {
    return (
        <div className={styles.container}>
            <select id="sort" value={sortBy} onChange={handleSortChange}>
                <option value="" disabled>
                    Sort by
                </option>
                <option value="">Default</option>
                <option value="title-asc">Title: A-Z</option>
                <option value="title-desc">Title: Z-A</option>
            </select>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    )
}
