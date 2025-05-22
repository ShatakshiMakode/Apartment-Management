// app/page.js
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-10">
      <Image
        src="/logo.png" // Replace with your logo if available
        alt="Apna Complex Logo"
        width={120}
        height={120}
      />
      <h1 className="text-4xl font-bold">Welcome to Apna Complex</h1>
      <p className="text-lg max-w-xl">
        A digital society platform to manage your apartment complex efficiently.
        Navigate through the menu to explore services, projects, and more.
      </p>
      <div className="space-x-4">
        <a
          href="/about"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Learn More
        </a>
        <a
          href="/login"
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
        >
          Login
        </a>
      </div>
    </div>
  );
}
