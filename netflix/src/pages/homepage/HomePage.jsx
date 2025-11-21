import BannerHero from "../../components/BannerHero/BannerHero";
import CategoryList from "../../components/CategoryList/CategoryList";
import "./Homepage.css";

export default function HomePage() {
    return (
        <>
            <div>
                <BannerHero />
                <CategoryList />
            </div>
        </>
    );
}
