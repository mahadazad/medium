import Link from "next/link";
import { Layout } from "../components/layout";

export default () => (
  <Layout title={`Not found.`}>
    <div>Could not find the page you were looking for.</div>
    <Link href="/posts">
      <a>go back to the story feed.</a>
    </Link>
  </Layout>
);
