import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BeatLoader } from "react-spinners";
import { ModelCard } from "../../components/ModelCard";

const MyDownloads = () => {
  const { user } = useContext(AuthContext);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-downloads?email=${user.email}`, {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setDownloads(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color="#db2777" />
      </div>
    );

  if (!downloads || downloads.length === 0)
    return <div className="text-center mt-20 text-gray-500">No downloads yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {downloads.map((download) => {
        if (!download.model_id) return null;

        const modelData = {
          _id: download.model_id,
          name: download.name,
          category: download.category,
          thumbnail: download.thumbnail,
          description: download.description || "",
          created_by: download.created_by,
        };

        return <ModelCard key={download._id} model={modelData} />;
      })}
    </div>
  );
};

export default MyDownloads;
