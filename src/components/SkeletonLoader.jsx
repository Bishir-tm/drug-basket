import ContentLoader from "react-content-loader";

export default function SkeletonLoader(){
  return(
    <ContentLoader 
      speed={2}
      width={Window.innerWidth - 10}
      height={800}
      viewBox="0 0 300 100"
      backgroundColor="#f1f1f1"
      foregroundColor="#b7e2ef"

    >
      {/* Customize the skeleton loader here */}
      <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
      <rect x="0" y="20" rx="3" ry="3" width="200" height="10" />
      <rect x="0" y="40" rx="3" ry="3" width="170" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
      <rect x="0" y="80" rx="3" ry="3" width="200" height="10" />
    </ContentLoader>
  );
}
  