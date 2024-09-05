export default function InfiniteScroll({
  visibleProducts,
  totalProducts,
  onLoadMore,
  text
}) {
  return (
    <>
      {visibleProducts < totalProducts && (
        <button
          onClick={onLoadMore}
          className="mt-8 px-4 py-2 flex gap-4 bg-gray-800 border-gray-700 hover:bg-secondary shadow-md text-white rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          {text}
        </button>
      )}
    </>
  );
}
