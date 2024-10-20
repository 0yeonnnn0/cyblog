import { useRouter } from "next/navigation"; // Next.js의 useRouter 사용

interface NavigationLinkProps {
  path: string;
  label: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ path, label }) => {
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
};

export default NavigationLink;
