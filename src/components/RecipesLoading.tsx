import SkeletonCard from "./SkeletonCard";

const RecipesLoading = () => {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="grid grid-cols-3 gap-8">
      {skeletonCount.map((i) => (
        <SkeletonCard key={i} />
      ))}
    </section>
  );
};

export default RecipesLoading;
