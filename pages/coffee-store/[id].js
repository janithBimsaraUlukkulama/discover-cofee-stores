import {useRouter} from "next/router";
import Link from "next/link";

import coffeeStoresData from '@/data/coffee-stores.json';

export async function getStaticProps(staticProps) {
    const {id} = staticProps.params;

    return {
        props: {
            coffeeStores: coffeeStoresData.find(coffeeStore => coffeeStore.id.toString() === id)
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [{params: {id: "0"}}, {params: {id: "1"}}],
        fallback: true
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    const {id} = router.query;
    console.log(props)

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Coffee Store</h1>
            <Link href='/'> Back to Home</Link>
            <p>{props.coffeeStores.address}</p>
        </div>
    );
}

export default CoffeeStore;
