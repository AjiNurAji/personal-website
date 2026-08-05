import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as LuIcons from "react-icons/lu";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as FiIcons from "react-icons/fi";
import * as VscIcons from "react-icons/vsc";

export const iconSets: Record<string, Record<string, React.ElementType>> = {
  Fa: FaIcons,
  Fa6: Fa6Icons,
  Md: MdIcons,
  Io: IoIcons,
  Io5: Io5Icons,
  Bi: BiIcons,
  Bs: BsIcons,
  Hi: HiIcons,
  Hi2: Hi2Icons,
  Lu: LuIcons,
  Ri: RiIcons,
  Si: SiIcons,
  Tb: TbIcons,
  Fi: FiIcons,
  Vsc: VscIcons,
};

export function getIconComponent(value?: string) {
  const raw = String(value || "");
  const [prefix, name] = raw.includes(":") ? raw.split(":") : ["Si", raw];
  return (prefix && name && iconSets[prefix]?.[name]) || null;
}

export function getIconEntries() {
  return Object.entries(iconSets).flatMap(([prefix, set]) =>
    Object.keys(set).map((key) => ({ key: `${prefix}:${key}`, Icon: set[key] }))
  );
}

export type IconKey = string;
// The registry intentionally exposes every installed react-icons family for admin selection.
export default iconSets;
