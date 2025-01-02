import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareGithub,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function SocialIcons() {
  return (
    <div className="flex gap-5 font-black select-none">
      <SocialIcon
        url="https://www.instagram.com/___yeonnnn"
        icon={faSquareInstagram}
      />
      <SocialIcon url="https://github.com/0yeonnnn0" icon={faSquareGithub} />
      <SocialIcon url="https://lmsd1.tistory.com/" icon={faSquarePen} />
      <SocialIcon
        url="https://www.linkedin.com/in/dongyeon-kim-49b6852a6//"
        icon={faLinkedin}
      />
    </div>
  );
}

type SocialIconProps = {
  url: string;
  icon: IconProp;
  size?: "1x" | "2x" | "3x";
};

function SocialIcon({ url, icon, size = "2x" }: SocialIconProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} size={size} />
    </a>
  );
}
