import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner";
import Image from "next/image";

import coffeeStoresData from '@/data/coffee-stores.json';
import Card from "@/components/card";

export async function getStaticProps(context) {
    return {
        props: {
            coffeeStores: coffeeStoresData
        },
    }
}

const handleOnButtonClick = () => {
    console.log('Button clicked');
};

export default function Home(props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Banner buttonText='View stores nearby' handleOnClick={handleOnButtonClick}/>
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" alt="hero-image" width={700} height={400}/>
                </div>
                {props.coffeeStores.length > 0
                    && <>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map(
                                (coffeeStore) => (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                ))}
                        </div>
                    </>}
            </main>
        </div>
    )
}
