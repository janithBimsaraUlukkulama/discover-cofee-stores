import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from "@/components/banner";
import Image from "next/image";

import Card from "@/components/card";
import {fetchCoffeeStores} from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import {useContext, useEffect, useState} from "react";
import {ACTION_TYPES, StoreContext} from "@/store/store-context";

export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStores(context.latLong, 30);
    return {
        props: {
            coffeeStores
        },
    }
}

export default function Home(props) {
    const {handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();

    // const [coffeeStores, setCoffeeStores] = useState(null);
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);

    const {dispatch, state} = useContext(StoreContext);

    const {coffeeStores, latLong} = state;

    useEffect(() => {
        async function setCoffeeStoresByLocation ()  {
            if (latLong) {
                try{
                    const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30)
                    console.log(37, fetchedCoffeeStores)
                    // setCoffeeStores(fetchedCoffeeStores);
                    dispatch({
                        type: ACTION_TYPES.SET_COFFEE_STORES,
                        payload: fetchedCoffeeStores
                    })
                }catch (error){
                    console.log({ error });
                    setCoffeeStoresError(error.message);
                }

            }
        }

        setCoffeeStoresByLocation().then(r => console.log(r));
    }, [latLong]);

    const handleOnButtonClick = () => {
        console.log('Button clicked');
        handleTrackLocation();
    };


    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Banner buttonText={isFindingLocation ? '...Locating' : 'View stores nearby'}
                        handleOnClick={handleOnButtonClick}/>
                {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
                {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" alt="hero-image" width={700} height={400}/>
                </div>
                {coffeeStores?.length > 0
                    && <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Stores near me</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map(
                                (coffeeStore) => (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                ))}
                        </div>
                    </div>}
                {(props.coffeeStores.length > 0)
                    && <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Toronto stores</h2>
                        <div className={styles.cardLayout}>
                            {props.coffeeStores.map(
                                (coffeeStore) => (
                                    <Card
                                        key={coffeeStore.id}
                                        name={coffeeStore.name}
                                        imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                ))}
                        </div>
                    </div>}

            </main>
        </div>
    )
}
