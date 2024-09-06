import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Aptitude Test Website</h1>
      <div className="space-x-4">
        <Link href="/create-test" className="bg-blue-500 text-white px-4 py-2 rounded">Create Test</Link>
        <Link href="/take-test" className="bg-green-500 text-white px-4 py-2 rounded">Take Test</Link>
      </div>
    </div>
  )
}