import styles from './LibrarySection.module.css';
import { useRef } from 'react';
import LibraryRows from '../LibraryRow/LibraryRows.jsx';


function LibrarySection() {
  const detailsRef = useRef();
  const summaryRef = useRef();

  function resizebyhight() {
    if (detailsRef.current.open) {
      summaryRef.current.classList.add(styles.headerInactive);
    } else {
      summaryRef.current.classList.remove(styles.headerInactive);
    }
  }

  return (
    <div>
      <details onToggle={resizebyhight} ref={detailsRef} id='container' className={styles.container}>
        <summary ref={summaryRef} id='header' className={styles.containerHeader}>Read Later</summary>
        <div className={styles.containerBody}>
            <LibraryRows />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque minus laudantium molestias atque repudiandae quo deleniti libero eius dolore necessitatibus, consequuntur ducimus reiciendis obcaecati laboriosam, voluptatibus dicta quia! Laboriosam, consequatur!</p>
        </div>
      </details>
    </div>
  );
}

export default LibrarySection;