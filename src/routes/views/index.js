import { Router } from "express"
import axios from "axios"

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        return res.render('index', {
            title: 'Home',
            style: 'index.css',
            script: '/public/conection.js'
        })
    } catch (error) {
      next(error)
    }
})

router.get('/products', async (req, res, next) => {
    try {
        const limit = 4
        let page = parseInt(req.query.page)
        let products
        let totalPages
        let totalProducts
        let pageNumbers = []

        const response = await axios.get('http://localhost:8080/api/products', {
            params: {
            limit,
            page
            }
        })
  
        if (response.status === 200) {
            let responseClean = response.data.response;
            products = responseClean.products;
            totalPages = responseClean.totalPages;
            totalProducts = responseClean.totalProducts;
    
            // Calcula los números de página
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push({
                    pageNumber: i,
                    active: i === page // Marca la página actual como activa (REVISAR)
                })
            }
        } else {
            // Renderizar /products sin productos
            console.error('Error al obtener los productos:', response.data)
        }
  
        return res.render('products/productList', {
            title: 'Products',
            products,
            totalPages,
            totalProducts,
            pageNumbers,
            style: 'productList.css',
            script: ''
        })
    } catch (error) {
      next(error)
    }   
})

router.get('/products/:pid', async (req, res, next) => {
    try {
      const productId = Number(req.params.pid)
  
      // Aquí puedes realizar la lógica para obtener los detalles del producto con el ID proporcionado
  
      // Por ejemplo, puedes hacer una solicitud a la API para obtener los detalles del producto
      const response = await axios.get(`http://localhost:8080/api/products/${productId}`)
      if (response.status === 200) {
        const product = response.data.response
        console.log(product)
        
        return res.render('products/productDetail', {
          title: 'Product Detail',
          product,
          style: 'productDetail.css',
          script: ''
        })
      } else {
        console.error('Error al obtener los detalles del producto:', response.data)
        // Renderizar una página de error o redireccionar a otra página
        return res.redirect('/error')
      }
    } catch (error) {
      next(error)
    }
  });

export default router