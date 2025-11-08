import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ModelCard } from "../../components/ModelCard";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router";

const MyDownloads = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-downloads?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <BeatLoader color="#db2777" />
    </div>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <div key={model._id} model={model} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <figure className="h-80 w-full overflow-hidden">
              <img
                src={model.model.thumbnail}
                alt={model.model.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <div className="badge text-xs badge-xs badge-secondary rounded-full">{model.model.category}</div>
              <div className="text-xs text-secondary">{model.model.created_by}</div>
              <p className="line-clamp-1">
                {model.model.description}
              </p>
              {/* <p className="text-sm text-base-content/70">by {author}</p> */}
              <div className="card-actions justify-between items-center mt-4">
                <div className="flex gap-4 text-sm text-base-content/60">
                  {/* <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views}
            </span> */}
                  {/* <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </span> */}
                </div>
                <Link to={`/model-details/${model.model._id}`} className="btn rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;
