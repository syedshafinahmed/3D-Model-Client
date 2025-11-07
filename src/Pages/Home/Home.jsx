import { useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { ModelCard } from "../../components/ModelCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner />

            <div className="text-center text-xl font-bold mt-10">Latest Models</div>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
                {data.map(model => <ModelCard key={model._id} model={model} />)}
            </div>

        </div>
    );
};

export default Home;