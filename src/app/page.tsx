import { auth } from "@clerk/nextjs";
import { HomeContent } from "@/components/HomeContent";

export default async function HomePage() {
  const { userId } = await auth();
  
  return (
    <HomeContent userId={userId} />
  );
} 