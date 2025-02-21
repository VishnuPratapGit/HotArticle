import { useEffect, useState } from "react";
import databaseServices from "../services/DatabaseServices";
import { useSelector, useDispatch } from "react-redux";
import { saveArticles, removeArticles } from "../redux/articleSlice";
import { Article } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const { status, data } = useSelector((state) => state.article);

  useEffect(() => {
    databaseServices.fetchArticles().then((data) => {
      if (data) {
        dispatch(saveArticles(data));
      } else {
        dispatch(removeArticles());
      }
    });
  }, []);

  if (status === false) {
    return (
      <div className="h-svh flex items-center justify-center">
        <h1 className="text-center font-semibold text-3xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 mt-5">
      {data?.map((article) => (
        <Article key={article.id} cardData={article} />
      ))}
    </div>
  );
};

export default Home;
