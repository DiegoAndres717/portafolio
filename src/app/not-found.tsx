import Link from "next/link";

function NotFoundPage() {
	return (
    <>
      <h1>Page not found</h1>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </>)
}

export default NotFoundPage