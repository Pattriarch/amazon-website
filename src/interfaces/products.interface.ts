interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
}

interface ICheckoutProduct extends IProduct {
    hasPrime: boolean;
}
