import { Navigate, useParams } from "react-router";

export default function MovieRedirect() {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/movie/${id}`} replace />;
}
