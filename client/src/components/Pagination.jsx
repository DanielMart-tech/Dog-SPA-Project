import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../redux/actions";
import "../styles/Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const pageNumber = useSelector((state) => state.pageNumber);
  const dogsPerPage = Math.ceil(dogs.length / 8);
  const pages = [];
  for (let i = 1; i <= dogsPerPage; i++) {
    pages.push(i);
  }

  const onOff = (page) => {
    let pageIndex = 0;
    const reactPages = document.querySelectorAll(".btn_item");
    reactPages.forEach((element) => {
      if (pageIndex === page) element.classList.add("active");
      else element.classList.remove("active");
      pageIndex++;
    });
  };

  function previousPage() {
    const currentPage = pageNumber - 1;
    if (currentPage === -1) return;
    onOff(currentPage);
    dispatch(setPageNumber(currentPage));
  }

  function nextPage() {
    const currentPage = pageNumber + 1;
    if (currentPage > pages.length - 1) return;
    onOff(currentPage);
    dispatch(setPageNumber(currentPage));
  }

  function currentPage(page) {
    onOff(page);
    dispatch(setPageNumber(page));
  }

  return (
    <div className="pagination">
      {pages.length === 1 || pages.length === 0 ? null : (
        <div>
          <button type="button" onClick={previousPage}>
            Previous
          </button>
          {pages.map((page, index) => (
            <button
              key={page}
              type="button"
              onClick={() => currentPage(index)}
              className="page btn_item"
            >
              {page}
            </button>
          ))}
          <button type="button" onClick={nextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
