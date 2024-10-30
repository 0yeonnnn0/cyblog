import { useRouter } from "next/navigation"; // Next.js의 useRouter 사용

interface NavigationLinkProps {
  path: string;
  label: string;
}

export default function NavigationLink({ path, label }: NavigationLinkProps) {
  const router = useRouter();

  return (
    <a
      className="cursor-pointer text-center"
      onClick={() => {
        router.push(path);
      }}
    >
      {label}
    </a>
  );
}
