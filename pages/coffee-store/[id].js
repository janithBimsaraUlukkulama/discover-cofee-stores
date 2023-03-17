import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import cn from 'classnames';

import styles from '@/styles/coffee-store.module.css';

import {fetchCoffeeStores} from "@/lib/coffee-stores";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "@/store/store-context";
import {isEmpty} from "@/utils";

export async function getStaticProps(staticProps) {
    const {id} = staticProps.params;
    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find(coffeeStore => coffeeStore.id === id);

    return {
        props: {
            coffeeStores: findCoffeeStoreById ? findCoffeeStoreById : {}
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();

    const paths = coffeeStores.map(coffeeStore => {
        return {
            params: {id: coffeeStore.id.toString()}
        }
    });

    return {
        paths,
        fallback: true
    }
}

const CoffeeStore = (initialProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const id = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStores);

    const {state: {coffeeStores}} = useContext(StoreContext);

    useEffect(()=>{
        if(isEmpty(initialProps.coffeeStores)){
            if(coffeeStores.length>0){
                const findCoffeeStoreById = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === id);
                setCoffeeStore(findCoffeeStoreById);
            }
        }
    },[id])

    const {locality, address, name, imgUrl} = coffeeStore;

    const handleUpvoteButton = () => {
        console.log('Upvote button clicked');
    };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href='/'>← Back to Home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imgUrl}
                        alt={name}
                        width={600}
                        height={360}
                        className={styles.storeImg}
                    />
                </div>
                <div className={cn("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/place.svg" width="24" height="24"/>
                            <p className={styles.text}>{address}</p>
                        </div>
                    )}
                    {locality && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/nearMe.svg" width="24" height="24"/>
                            <p className={styles.text}>{locality}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24"/>
                        <p className={styles.text}>1</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
                        Up Vote!
                    </button>

                </div>
            </div>
        </div>
    );
}

export default CoffeeStore;
