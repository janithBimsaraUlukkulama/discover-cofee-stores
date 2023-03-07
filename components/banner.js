import styles from '@/components/banner.module.css'

const Banner = ({buttonText, handleOnClick}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee </span>
                <span className={styles.title2}>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your favorite local coffee shop</p>
            <button className={styles.buttonWrapper} >
                <button className={styles.button} onClick={handleOnClick}>{buttonText}</button>
            </button>
        </div>
    );
};

export default Banner;
