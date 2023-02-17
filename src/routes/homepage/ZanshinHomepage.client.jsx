import NewIntro from './homepagesrc/NewIntro.client'
import NewIntroMobile from './homepagesrc/NewIntroMobile.client'
import { fetchSync } from '@shopify/hydrogen'

export default function ZanshinHomepage({ nodes }) {
    const bestSeller = fetchBest()

    return (
        <>
            <div className="forthswitch:hidden w-full">
                <NewIntro bestSeller={bestSeller} nodes={nodes} />
            </div>
            <div className="hidden forthswitch:flex w-full">
                <NewIntroMobile bestSeller={bestSeller} nodes={nodes} />
            </div>
        </>
    )
}


function fetchBest() {
    const res = fetchSync("/api/bestSellers")
    if (!res.ok) {
        console.error(
            `Unable to load top products ${res.url} returned a ${res.status}`,
        );
        return null;
    } else {
        return res.json()
    }
}