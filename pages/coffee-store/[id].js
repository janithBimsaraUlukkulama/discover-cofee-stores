import {useRouter} from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            <h1>Coffee Store</h1>
            <Link href='/'> Back to Home</Link>
        </div>
    );
}

export default CoffeeStore;
