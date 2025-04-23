import './Pagination.css'
import { PropTypes } from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css';


export default function Pagination(props) {
  const { prevPage, nextPage, getPage, page, totalPages } = props;
  //const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const firstThreePages = [1, 2, 3]
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages]
  const middleThreePages = [page - 1, page, page + 1];
  const pagesArray =
    totalPages > 2 ?
      page === 1 ?
        firstThreePages
        : page === totalPages ?
          lastThreePages
          : middleThreePages
      : Array.from({ length: totalPages }, (_, index) => index + 1)
      


  //!totalPages? null
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination" id="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {

          pagesArray.map((pn, index) => <li className="page-item" key={pn}><a className="page-link" href="#" id={`page${pn}`} onClick={() => getPage(pn)}>{pn}</a></li>)
        }
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

      </ul>
    </nav>
  )
}
Pagination.propTypes = {
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired

}
