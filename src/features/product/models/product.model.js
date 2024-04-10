export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this.id = id
        this.name = name
        this.desc = desc;
        this.price = price
        this.imageUrl = imageUrl
        this.category = category
        this.sizes = sizes
    }

    static GetAll() {
        return products;
    }

    static Get(id) {
        return products.find(product => product.id == id);
    }

    static add(name, desc, price, imageUrl, category, sizes) {
        let id = products.length + 1;
        const product = new ProductModel(id, name, desc, price, imageUrl, category, sizes.split(','))
        products.push(product);
        return product;
    }

    static filterProd(minPrice, maxPrice, category) {
        return products.filter(eachProduct => (!category || eachProduct.category == category) && (!minPrice || eachProduct.price >= minPrice) && (!maxPrice || eachProduct.price <= maxPrice))
    }

}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1',
        ['M', 'XL']
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M', 'XL', 'S']
    )];