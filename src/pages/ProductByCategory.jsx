import React, { useContext } from 'react'
import { Row, Container, Spinner } from 'react-bootstrap'
import ProductCard from '../components/ProductCard/'
import { ProductListContext } from '../ContextProvider/ProductListContextProvider'
import Pagination from '../components/Pagination/Pagination'
import NavBar from '../components/NavBar/'
import PropTypes from 'prop-types'

export default function ProductByCategory (match) {
  const { productList, getProductListLoading } = useContext(ProductListContext)
  const { category } = match.match.params
  const { index } = match.match.params
  const categoryList = Object.values(productList).filter(product => {
    return product.category === category
  })

  const pivot = 10
  const start = (parseInt(index) - 1) * pivot
  const end = parseInt(index) * pivot

  const renderCategoryList = (categoryList, start, end) => {
    if (getProductListLoading) {
      return <Spinner animation='grow' variant='danger' />
    }
    return categoryList
      .map((product, index) => {
        return <ProductCard key={index} product={product} />
      })
      .slice(start, end)
  }

  return (
    <div className='Products'>
      <NavBar />
      <Container>
        <Pagination
          title={`List of ${category} productList`}
          index={parseInt(index)}
          to={`/productList/${category}`}
          total={Math.ceil(categoryList.length / pivot)}
        />
        <Row>{renderCategoryList(categoryList, start, end)}</Row>
      </Container>
    </div>
  )
}

ProductByCategory.prototype = {
  productList: PropTypes.array,
  getProductListLoading: PropTypes.bool
}
