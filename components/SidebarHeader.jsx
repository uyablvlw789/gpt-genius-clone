import { SiOpenaigym } from "react-icons/si";
import ThemeToggle from "./ThemeToggle";

function SidebarHeader() {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <SiOpenaigym className="min-w-10 h-10 text-primary" />
      <h2 className="text-xl font-extrabold text-primary mr-auto">
        使用ChatGPT学习/翻译
      </h2>
      <ThemeToggle />
    </div>
  );
}
export default SidebarHeader;
