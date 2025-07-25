import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="296" rx="15" ry="15" width="280" height="25" />
    <rect x="0" y="339" rx="10" ry="10" width="280" height="78" />
    <rect x="1" y="432" rx="10" ry="10" width="95" height="30" />
    <rect x="123" y="424" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default MyLoader;
