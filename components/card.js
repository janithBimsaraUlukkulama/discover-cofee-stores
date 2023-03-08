import Image from "next/image";
import Link from "next/link";
import cn from 'classnames';

import styles from '@/components/card.module.css';

const Card = ({name, href, imgUrl}) => {
    return (
        <Link className={styles.cardLink} href={href}>
            <div className={cn("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{name}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image
                        className={styles.cardImage}
                        alt={name}
                        src={imgUrl}
                        width={260}
                        height={160}/>
                </div>
            </div>
        </Link>
    );
}

export default Card;
