import { useEffect, useState } from "react";
import databaseServices from "../services/DatabaseServices";
import { useSelector, useDispatch } from "react-redux";
import { saveArticles, removeArticles } from "../redux/articleSlice";
import { Article, Pagination } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const { status, data } = useSelector((state) => state.article);
  const [page, setPage] = useState(1);

  useEffect(() => {
    databaseServices.fetchArticles(page).then((data) => {
      if (data) {
        dispatch(saveArticles(data));
      } else {
        dispatch(removeArticles());
      }
    });
  }, [page]);

  if (status === false) {
    return (
      <div className="h-svh flex items-center justify-center">
        <h1 className="text-center font-semibold text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-5">
        {data?.map((article) => (
          <Article key={article.id} cardData={article} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} length={data.length} />
    </div>
  );
};

export default Home;
