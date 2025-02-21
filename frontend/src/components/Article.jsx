const Article = ({ cardData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shortenUrl = (url) => {
    const hostname = new URL(url).hostname;
    const source = hostname.split(".")[1];
    return source;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-neutral-900 rounded-lg shadow-lg hover:shadow-xl transition-colors duration-300 border border-neutral-700">
        <a
          href={cardData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="capitalize">{shortenUrl(cardData.link)}</span>
              <span className="text-purple-500 overflow-ellipsis overflow-hidden max-w-sm text-nowrap text-sm font-medium">
                {cardData.link}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {formatDate(cardData.createdAt)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-400 transition-colors duration-200">
            {cardData.title}
          </h3>

          <p className="text-gray-300 text-base mb-4">{cardData.snippet}</p>

          <span className="text-purple-300 bg-purple-900 bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
            {cardData.category}
          </span>
        </a>
      </div>
    </div>
  );
};

export default Article;
