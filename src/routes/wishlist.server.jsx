import { Suspense } from "react"
import { Layout } from "../components/index.server"
import WishlistPage from "../components/product/WishlistPage.client"
export default function Wishlist() {

  return (
    <Layout>
        <Suspense>
            <WishlistPage/>
        </Suspense>
    </Layout>
  )
}
